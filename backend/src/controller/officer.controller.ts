import { Request, Response, NextFunction } from 'express';
import Officer from '../schema/officer.schema';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

export const listOfficers = asyncHandler(async (req: Request, res: Response) => {
    const { region, q } = req.query;
    const filter: Record<string, unknown> = {};
    if (region) filter.region = region;
    if (q && typeof q === 'string') {
        filter.$or = [
            { name: new RegExp(q, 'i') },
            { email: new RegExp(q, 'i') },
            { staffId: new RegExp(q, 'i') },
        ];
    }
    const items = await Officer.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
});

export const getOfficer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const officer = await Officer.findById(req.params.id);
        if (!officer) return next(new ErrorResponse('Officer not found', 404));
        res.status(200).json({ success: true, officer });
    }
);
