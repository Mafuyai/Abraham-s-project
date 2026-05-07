import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import Distribution from '../schema/distribution.schema';
import Farmer from '../schema/farmer.schema';
import Input from '../schema/input.schema';
import ScanLog from '../schema/scanLog.schema';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

interface DistributionLine {
    input: string;
    quantity: number;
}

const normalizeTag = (t: string | undefined): string =>
    (t || '').trim().toUpperCase();

const decrementStock = async (
    items: DistributionLine[],
    session: ClientSession
): Promise<void> => {
    for (const line of items) {
        if (!line.input || !line.quantity || line.quantity < 1) {
            throw new ErrorResponse(
                'Each item needs input and positive quantity',
                400
            );
        }
        const input = await Input.findById(line.input).session(session);
        if (!input) {
            throw new ErrorResponse(`Input ${line.input} not found`, 404);
        }
        if (!input.active) {
            throw new ErrorResponse(`Input ${input.name} inactive`, 400);
        }
        if (input.stock < line.quantity) {
            throw new ErrorResponse(
                `Insufficient stock for ${input.name} (have ${input.stock}, need ${line.quantity})`,
                400
            );
        }
        input.stock -= line.quantity;
        await input.save({ session });
    }
};

export const createDistribution = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ErrorResponse('Not authorized', 401));
        const { rfidTag, items, location, notes } = req.body as {
            rfidTag: string;
            items: DistributionLine[];
            location?: { state?: string; lga?: string; community?: string };
            notes?: string;
        };

        const tag = normalizeTag(rfidTag);
        if (!tag) return next(new ErrorResponse('rfidTag required', 400));
        if (!Array.isArray(items) || items.length === 0) {
            return next(new ErrorResponse('items[] required', 400));
        }

        const farmer = await Farmer.findOne({ rfidTag: tag });
        if (!farmer) {
            await ScanLog.create({
                rfidTag: tag,
                officer: req.user.id,
                action: 'distribute',
                result: 'unknown_tag',
            });
            return next(
                new ErrorResponse('No farmer bound to this tag', 404)
            );
        }
        if (!farmer.active) {
            return next(new ErrorResponse('Farmer record is inactive', 400));
        }

        const session = await mongoose.startSession();
        try {
            let distributionId: mongoose.Types.ObjectId | null = null;
            await session.withTransaction(async () => {
                await decrementStock(items, session);

                const [created] = await Distribution.create(
                    [
                        {
                            farmer: farmer._id,
                            rfidTag: tag,
                            items,
                            officer: req.user!.id,
                            location,
                            notes,
                        },
                    ],
                    { session }
                );
                distributionId = created._id;

                await ScanLog.create(
                    [
                        {
                            rfidTag: tag,
                            farmer: farmer._id,
                            officer: req.user!.id,
                            action: 'distribute',
                            result: 'success',
                            meta: { distributionId },
                        },
                    ],
                    { session }
                );
            });

            const populated = await Distribution.findById(distributionId)
                .populate('items.input', 'name category unit')
                .populate('farmer', 'fullName rfidTag phone state lga')
                .populate('officer', 'name email');
            res.status(201).json({ success: true, distribution: populated });
        } catch (err) {
            if (err instanceof ErrorResponse) return next(err);
            throw err;
        } finally {
            session.endSession();
        }
    }
);

export const listDistributions = asyncHandler(
    async (req: Request, res: Response) => {
        const { farmer, officer, page = 1, limit = 20 } = req.query;
        const filter: Record<string, unknown> = {};
        if (farmer) filter.farmer = farmer;
        if (officer) filter.officer = officer;

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            Distribution.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('items.input', 'name category unit')
                .populate('farmer', 'fullName rfidTag phone')
                .populate('officer', 'name email'),
            Distribution.countDocuments(filter),
        ]);
        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            items,
        });
    }
);

export const getDistribution = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const distribution = await Distribution.findById(req.params.id)
            .populate('items.input', 'name category unit')
            .populate('farmer')
            .populate('officer', 'name email region');
        if (!distribution) {
            return next(new ErrorResponse('Distribution not found', 404));
        }
        res.status(200).json({ success: true, distribution });
    }
);

export const farmerHistory = asyncHandler(
    async (req: Request, res: Response) => {
        const items = await Distribution.find({ farmer: req.params.farmerId })
            .sort({ createdAt: -1 })
            .populate('items.input', 'name category unit')
            .populate('officer', 'name');
        res.status(200).json({ success: true, items });
    }
);
