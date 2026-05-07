import { Request, Response, NextFunction } from 'express';
import Farmer from '../schema/farmer.schema';
import ScanLog from '../schema/scanLog.schema';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

const normalizeTag = (t: string | undefined): string =>
    (t || '').trim().toUpperCase();

export const registerFarmer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ErrorResponse('Not authorized', 401));
        const {
            rfidTag,
            fullName,
            nationalId,
            phone,
            gender,
            dateOfBirth,
            state,
            lga,
            community,
            farmSizeHectares,
            primaryCrop,
            cooperative,
        } = req.body;

        const tag = normalizeTag(rfidTag);
        if (!tag || !fullName || !phone || !gender || !state || !lga) {
            return next(
                new ErrorResponse(
                    'rfidTag, fullName, phone, gender, state and lga are required',
                    400
                )
            );
        }

        const existing = await Farmer.findOne({ rfidTag: tag });
        if (existing) {
            await ScanLog.create({
                rfidTag: tag,
                officer: req.user.id,
                action: 'register',
                result: 'failed',
                meta: { reason: 'tag already bound', farmerId: existing._id },
            });
            return next(
                new ErrorResponse('RFID tag already bound to a farmer', 409)
            );
        }

        const farmer = await Farmer.create({
            rfidTag: tag,
            fullName,
            nationalId,
            phone,
            gender,
            dateOfBirth,
            state,
            lga,
            community,
            farmSizeHectares,
            primaryCrop,
            cooperative,
            registeredBy: req.user.id,
        });

        await ScanLog.create({
            rfidTag: tag,
            farmer: farmer._id,
            officer: req.user.id,
            action: 'register',
            result: 'success',
        });

        res.status(201).json({ success: true, farmer });
    }
);

export const lookupByTag = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ErrorResponse('Not authorized', 401));
        const tag = normalizeTag(req.params.tag);
        const farmer = await Farmer.findOne({ rfidTag: tag }).populate(
            'registeredBy',
            'name email region'
        );

        await ScanLog.create({
            rfidTag: tag,
            farmer: farmer ? farmer._id : undefined,
            officer: req.user.id,
            action: 'verify',
            result: farmer ? 'success' : 'unknown_tag',
        });

        if (!farmer) {
            return next(
                new ErrorResponse('No farmer bound to this tag', 404)
            );
        }
        res.status(200).json({ success: true, farmer });
    }
);

export const listFarmers = asyncHandler(async (req: Request, res: Response) => {
    const { state, lga, q, page = 1, limit = 20 } = req.query;
    const filter: Record<string, unknown> = {};
    if (state) filter.state = state;
    if (lga) filter.lga = lga;
    if (q && typeof q === 'string') {
        filter.$or = [
            { fullName: new RegExp(q, 'i') },
            { phone: new RegExp(q, 'i') },
            { rfidTag: new RegExp(q, 'i') },
        ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        Farmer.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Farmer.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        total,
        page: Number(page),
        items,
    });
});

export const getFarmer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const farmer = await Farmer.findById(req.params.id).populate(
            'registeredBy',
            'name email region'
        );
        if (!farmer) return next(new ErrorResponse('Farmer not found', 404));
        res.status(200).json({ success: true, farmer });
    }
);

export const updateFarmer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { rfidTag, ...rest } = req.body;
        const update: Record<string, unknown> = { ...rest };
        if (rfidTag) update.rfidTag = normalizeTag(rfidTag);

        const farmer = await Farmer.findByIdAndUpdate(req.params.id, update, {
            new: true,
            runValidators: true,
        });
        if (!farmer) return next(new ErrorResponse('Farmer not found', 404));
        res.status(200).json({ success: true, farmer });
    }
);

export const deactivateFarmer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const farmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        );
        if (!farmer) return next(new ErrorResponse('Farmer not found', 404));
        res.status(200).json({ success: true, farmer });
    }
);
