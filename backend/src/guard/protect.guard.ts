import { RequestHandler } from 'express';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import { verify } from '../utils/jwt';
import Officer from '../schema/officer.schema';
import Admin from '../schema/admin.schema';

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return next(new ErrorResponse('Not authorized — missing token', 401));
    }

    const token = header.split(' ')[1];

    let decoded;
    try {
        decoded = verify(token);
    } catch {
        return next(new ErrorResponse('Not authorized — invalid token', 401));
    }

    const account =
        decoded.role === 'admin'
            ? await Admin.findById(decoded.id)
            : await Officer.findById(decoded.id);
    if (!account) {
        return next(new ErrorResponse('Not authorized — account missing', 401));
    }

    req.user = {
        id: account._id.toString(),
        email: account.email,
        name: account.name,
        role: decoded.role,
    };
    next();
});

export const requireRole =
    (...allowed: Array<'admin' | 'officer'>): RequestHandler =>
    (req, res, next) => {
        if (!req.user || !allowed.includes(req.user.role)) {
            return next(new ErrorResponse('Forbidden', 403));
        }
        next();
    };
