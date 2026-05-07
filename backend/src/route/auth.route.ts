import { Router } from 'express';
import {
    signup,
    signin,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
} from '../controller/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
