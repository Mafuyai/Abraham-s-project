import nodemailer from 'nodemailer';
import { REGISTER_TEMPLATE } from './template/register.template';
import { OTP_TEMPLATE } from './template/otp.template';
import { SIGNIN_TEMPLATE } from './template/signin.template';
import { VERIFY_SUCCESS_TEMPLATE } from './template/verify.success.template';
import { VERIFICATION_EMAIL_TEMPLATE } from './template/verifyToken.template';

export type EmailType =
    | 'verification'
    | 'register'
    | 'otp'
    | 'signin'
    | 'verifySuccess';

export interface SendEmailOptions {
    to: string;
    subject: string;
    type: EmailType;
    message: {
        otp?: string;
        name?: string;
        email?: string;
        time?: string;
        device?: string;
    };
    html?: string;
}

const buildHtml = (option: SendEmailOptions): string => {
    const m = option.message;
    switch (option.type) {
        case 'verification':
            return VERIFICATION_EMAIL_TEMPLATE(m.otp ?? '', m.name ?? '');
        case 'register':
            return REGISTER_TEMPLATE(m.name ?? '', m.email ?? '');
        case 'otp':
            return OTP_TEMPLATE(m.name ?? '', m.otp ?? '');
        case 'signin':
            return SIGNIN_TEMPLATE(m.name ?? '', m.time ?? '', m.device ?? '');
        case 'verifySuccess':
            return VERIFY_SUCCESS_TEMPLATE(m.name ?? '');
        default:
            throw new Error('Invalid email template type');
    }
};

export const sendEmail = async (option: SendEmailOptions): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        logger: true,
        debug: true,
    });

    const html = option.html ?? buildHtml(option);
    const info = await transporter.sendMail({
        from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USER}>`,
        to: option.to,
        subject: option.subject,
        html,
    });
    console.log('Email sent:', info.response);
};

export default sendEmail;
