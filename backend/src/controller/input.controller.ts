import { Request, Response, NextFunction } from 'express';
import Input from '../schema/input.schema';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

export const listInputs = asyncHandler(async (req: Request, res: Response) => {
    const { category, active } = req.query;
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.active = active === 'true';
    const items = await Input.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, items });
});

export const getInput = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const input = await Input.findById(req.params.id);
        if (!input) return next(new ErrorResponse('Input not found', 404));
        res.status(200).json({ success: true, input });
    }
);

export const createInput = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, category, unit, stock, description } = req.body;
        if (!name || !category || !unit) {
            return next(
                new ErrorResponse('name, category and unit required', 400)
            );
        }
        const input = await Input.create({
            name,
            category,
            unit,
            stock,
            description,
        });
        res.status(201).json({ success: true, input });
    }
);

export const updateInput = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const input = await Input.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!input) return next(new ErrorResponse('Input not found', 404));
        res.status(200).json({ success: true, input });
    }
);

export const adjustStock = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { delta } = req.body;
        if (typeof delta !== 'number') {
            return next(new ErrorResponse('delta (number) required', 400));
        }
        const input = await Input.findById(req.params.id);
        if (!input) return next(new ErrorResponse('Input not found', 404));
        if (input.stock + delta < 0) {
            return next(new ErrorResponse('Insufficient stock', 400));
        }
        input.stock += delta;
        await input.save();
        res.status(200).json({ success: true, input });
    }
);
