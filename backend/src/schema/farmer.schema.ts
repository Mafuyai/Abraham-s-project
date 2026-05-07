import { Schema, model, Document, Types } from 'mongoose';

export interface FarmerDocument extends Document {
    _id: Types.ObjectId;
    rfidTag: string;
    fullName: string;
    nationalId?: string;
    phone: string;
    gender: 'Male' | 'Female';
    dateOfBirth?: Date;
    state: string;
    lga: string;
    community?: string;
    farmSizeHectares?: number;
    primaryCrop?: string;
    cooperative?: string;
    registeredBy: Types.ObjectId;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FarmerSchema = new Schema<FarmerDocument>(
    {
        rfidTag: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            uppercase: true,
        },
        fullName: { type: String, required: true, trim: true },
        nationalId: { type: String, unique: true, sparse: true, trim: true },
        phone: { type: String, required: true, trim: true },
        gender: { type: String, enum: ['Male', 'Female'], required: true },
        dateOfBirth: { type: Date },
        state: { type: String, required: true, trim: true },
        lga: { type: String, required: true, trim: true },
        community: { type: String, trim: true },
        farmSizeHectares: { type: Number, min: 0 },
        primaryCrop: { type: String, trim: true },
        cooperative: { type: String, trim: true },
        registeredBy: {
            type: Schema.Types.ObjectId,
            ref: 'Officer',
            required: true,
        },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

FarmerSchema.index({ state: 1, lga: 1 });

export const Farmer = model<FarmerDocument>('Farmer', FarmerSchema);
export default Farmer;
