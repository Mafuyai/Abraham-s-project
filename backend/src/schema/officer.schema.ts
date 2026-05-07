import { Schema, model, Document, Types, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface OfficerDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name: string;
    phone?: string;
    staffId?: string;
    region?: string;
    otp?: string;
    otpExpiry?: Date;
    isVerified: boolean;
    role: 'officer';
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}

const OfficerSchema = new Schema<OfficerDocument>(
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
        phone: { type: String, trim: true },
        staffId: { type: String, unique: true, sparse: true, trim: true },
        region: { type: String, trim: true },
        otp: { type: String, select: false },
        otpExpiry: { type: Date, select: false },
        isVerified: { type: Boolean, default: false },
        role: { type: String, default: 'officer', enum: ['officer'] },
        profileCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

OfficerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

OfficerSchema.methods.comparePassword = async function (
    candidate: string
): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
};

export const Officer = model<OfficerDocument>('Officer', OfficerSchema);
export default Officer;
