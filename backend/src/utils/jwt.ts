import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export interface JwtPayload {
    id: string;
    role: 'admin' | 'officer';
}

export const sign = (payload: JwtPayload): string =>
    jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

export const verify = (token: string): JwtPayload =>
    jwt.verify(token, SECRET) as JwtPayload;
