import { Schema, model, Document, Types, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface AdminDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name: string;
    role: 'admin';
    profileCompleted: boolean;
    otp?: string;
    otpExpiry?: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}

const AdminSchema = new Schema<AdminDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, select: false },
        name: { type: String, required: true, trim: true },
        role: { type: String, default: 'admin', enum: ['admin'] },
        profileCompleted: { type: Boolean, default: false },
        otp: { type: String, select: false },
        otpExpiry: { type: Date, select: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

AdminSchema.methods.comparePassword = async function (
    candidate: string
): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
};

export const Admin = model<AdminDocument>('Admin', AdminSchema);
export default Admin;
