import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import Officer, { OfficerDocument } from '../schema/officer.schema';
import Admin, { AdminDocument } from '../schema/admin.schema';
import sendEmail from '../mail/index.mail';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import { sign } from '../utils/jwt';
import { generateOtp, otpExpiry } from '../utils/otp';

type Role = 'admin' | 'officer';
type AnyAccount = AdminDocument | OfficerDocument;

interface FoundAccount {
    account: AnyAccount;
    role: Role;
    Model: Model<AnyAccount>;
}

const modelForRole = (role: string): Model<AnyAccount> | null => {
    if (role === 'admin') return Admin as unknown as Model<AnyAccount>;
    if (role === 'officer') return Officer as unknown as Model<AnyAccount>;
    return null;
};

const findAcrossRoles = async (email: string): Promise<FoundAccount | null> => {
    const admin = await Admin.findOne({ email }).select('+password +otp +otpExpiry');
    if (admin) {
        return {
            account: admin,
            role: 'admin',
            Model: Admin as unknown as Model<AnyAccount>,
        };
    }
    const officer = await Officer.findOne({ email }).select(
        '+password +otp +otpExpiry'
    );
    if (officer) {
        return {
            account: officer,
            role: 'officer',
            Model: Officer as unknown as Model<AnyAccount>,
        };
    }
    return null;
};

const issueToken = (account: AnyAccount, role: Role): string =>
    sign({ id: account._id.toString(), role });

const safeAccount = (account: AnyAccount, role: Role) => ({
    id: account._id.toString(),
    email: account.email,
    name: account.name,
    role,
    isVerified: account.isVerified,
    profileCompleted: account.profileCompleted,
});

export const signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, name, role, phone, region, staffId } = req.body;

        if (!email || !password || !name || !role) {
            return next(
                new ErrorResponse(
                    'email, password, name and role are required',
                    400
                )
            );
        }

        const Model = modelForRole(role);
        if (!Model) {
            return next(
                new ErrorResponse('Invalid role — must be officer or admin', 400)
            );
        }

        const existing = await findAcrossRoles(email);
        if (existing) {
            return next(new ErrorResponse('Email already registered', 400));
        }

        const otp = generateOtp();
        const account = await Model.create({
            email,
            password,
            name,
            phone,
            region,
            staffId,
            otp,
            otpExpiry: otpExpiry(10),
        });

        try {
            await sendEmail({
                to: email,
                subject: 'Verify Your Account',
                type: 'verification',
                message: { otp, name },
            });
        } catch (err) {
            console.error('Email send failed (non-fatal):', (err as Error).message);
        }

        res.status(201).json({
            success: true,
            message:
                'Signup successful. Check your email for the verification code.',
            email: account.email,
        });
    }
);

export const signin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse('Email and password required', 400));
        }

        const found = await findAcrossRoles(email);
        if (!found) {
            return next(
                new ErrorResponse('Account not found. Please sign up.', 404)
            );
        }

        const valid = await found.account.comparePassword(password);
        if (!valid) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        if (!found.account.isVerified) {
            return next(
                new ErrorResponse(
                    'Account not verified — check your email',
                    403
                )
            );
        }

        const token = issueToken(found.account, found.role);
        res.status(200).json({
            success: true,
            message: 'Sign in successful',
            token,
            user: safeAccount(found.account, found.role),
        });
    }
);

export const verifyOTP = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return next(new ErrorResponse('Email and OTP required', 400));
        }

        const found = await findAcrossRoles(email);
        if (!found) return next(new ErrorResponse('Account not found', 404));

        if (found.account.otp !== otp) {
            return next(new ErrorResponse('Invalid OTP', 400));
        }

        if (!found.account.otpExpiry || found.account.otpExpiry < new Date()) {
            return next(new ErrorResponse('OTP has expired', 400));
        }

        await found.Model.updateOne(
            { _id: found.account._id },
            { $set: { isVerified: true }, $unset: { otp: '', otpExpiry: '' } }
        );

        try {
            await sendEmail({
                to: email,
                subject: 'Account Verified',
                type: 'verifySuccess',
                message: { name: found.account.name },
            });
        } catch (err) {
            console.error('Email send failed (non-fatal):', (err as Error).message);
        }

        res.status(200).json({
            success: true,
            message: 'Account verified. You can now sign in.',
        });
    }
);

export const resendOTP = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        if (!email) return next(new ErrorResponse('Email required', 400));

        const found = await findAcrossRoles(email);
        if (!found) return next(new ErrorResponse('Account not found', 404));

        const otp = generateOtp();
        await found.Model.updateOne(
            { _id: found.account._id },
            { $set: { otp, otpExpiry: otpExpiry(10) } }
        );

        await sendEmail({
            to: email,
            subject: 'New Verification Code',
            type: 'verification',
            message: { otp, name: found.account.name },
        });

        res.status(200).json({
            success: true,
            message: 'New verification code sent.',
        });
    }
);

export const forgotPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        if (!email) return next(new ErrorResponse('Email required', 400));

        const found = await findAcrossRoles(email);
        if (!found) {
            res.status(200).json({
                success: true,
                message: 'If an account exists, a reset code has been sent.',
            });
            return;
        }

        const otp = generateOtp();
        await found.Model.updateOne(
            { _id: found.account._id },
            { $set: { otp, otpExpiry: otpExpiry(15) } }
        );

        await sendEmail({
            to: email,
            subject: 'Reset Your Password',
            type: 'verification',
            message: { otp, name: found.account.name },
        });

        res.status(200).json({
            success: true,
            message: 'If an account exists, a reset code has been sent.',
        });
    }
);

export const resetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return next(
                new ErrorResponse('email, otp and newPassword required', 400)
            );
        }

        const found = await findAcrossRoles(email);
        if (!found) return next(new ErrorResponse('Account not found', 404));

        if (found.account.otp !== otp) {
            return next(new ErrorResponse('Invalid OTP', 400));
        }
        if (!found.account.otpExpiry || found.account.otpExpiry < new Date()) {
            return next(new ErrorResponse('OTP has expired', 400));
        }

        found.account.password = newPassword;
        await found.account.save();
        await found.Model.updateOne(
            { _id: found.account._id },
            { $unset: { otp: '', otpExpiry: '' } }
        );

        res.status(200).json({
            success: true,
            message: 'Password reset successful.',
        });
    }
);
