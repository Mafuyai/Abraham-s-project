import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import Officer, { OfficerDocument } from '../schema/officer.schema';
import Admin, { AdminDocument } from '../schema/admin.schema';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

type AnyAccount = AdminDocument | OfficerDocument;

const modelForRole = (role: 'admin' | 'officer'): Model<AnyAccount> =>
    role === 'admin'
        ? (Admin as unknown as Model<AnyAccount>)
        : (Officer as unknown as Model<AnyAccount>);

export const getProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ErrorResponse('Not authorized', 401));
        const Model = modelForRole(req.user.role);
        const account = await Model.findById(req.user.id);
        if (!account) return next(new ErrorResponse('Account not found', 404));

        const isOfficer = req.user.role === 'officer';
        const officer = isOfficer ? (account as OfficerDocument) : null;

        res.status(200).json({
            success: true,
            user: {
                id: account._id.toString(),
                email: account.email,
                name: account.name,
                phone: officer?.phone,
                region: officer?.region,
                staffId: officer?.staffId,
                role: req.user.role,
                isVerified: account.isVerified,
                profileCompleted: account.profileCompleted,
            },
        });
    }
);

export const updateProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ErrorResponse('Not authorized', 401));
        const { name, phone, region, staffId } = req.body;

        const Model = modelForRole(req.user.role);
        const updates: Record<string, unknown> = { profileCompleted: true };
        if (name) updates.name = name;
        if (phone) updates.phone = phone;
        if (region) updates.region = region;
        if (staffId) updates.staffId = staffId;

        const account = await Model.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!account) return next(new ErrorResponse('Account not found', 404));

        const isOfficer = req.user.role === 'officer';
        const officer = isOfficer ? (account as OfficerDocument) : null;

        res.status(200).json({
            success: true,
            message: 'Profile updated',
            user: {
                id: account._id.toString(),
                email: account.email,
                name: account.name,
                phone: officer?.phone,
                region: officer?.region,
                staffId: officer?.staffId,
                role: req.user.role,
                profileCompleted: account.profileCompleted,
            },
        });
    }
);
