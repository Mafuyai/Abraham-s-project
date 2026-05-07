import 'express';

declare global {
    namespace Express {
        interface UserPayload {
            id: string;
            email: string;
            name: string;
            role: 'admin' | 'officer';
        }
        interface Request {
            user?: UserPayload;
        }
    }
}

export {};
