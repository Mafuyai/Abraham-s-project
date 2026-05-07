import { Schema, model, Document, Types } from 'mongoose';

export interface DistributionItem {
    input: Types.ObjectId;
    quantity: number;
}

export interface DistributionDocument extends Document {
    _id: Types.ObjectId;
    farmer: Types.ObjectId;
    rfidTag: string;
    items: DistributionItem[];
    officer: Types.ObjectId;
    location?: { state?: string; lga?: string; community?: string };
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const DistributionItemSchema = new Schema<DistributionItem>(
    {
        input: {
            type: Schema.Types.ObjectId,
            ref: 'Input',
            required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const DistributionSchema = new Schema<DistributionDocument>(
    {
        farmer: {
            type: Schema.Types.ObjectId,
            ref: 'Farmer',
            required: true,
            index: true,
        },
        rfidTag: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            index: true,
        },
        items: {
            type: [DistributionItemSchema],
            validate: (v: DistributionItem[]) => Array.isArray(v) && v.length > 0,
        },
        officer: {
            type: Schema.Types.ObjectId,
            ref: 'Officer',
            required: true,
        },
        location: {
            state: { type: String, trim: true },
            lga: { type: String, trim: true },
            community: { type: String, trim: true },
        },
        notes: { type: String, trim: true },
    },
    { timestamps: true }
);

DistributionSchema.index({ createdAt: -1 });

export const Distribution = model<DistributionDocument>(
    'Distribution',
    DistributionSchema
);
export default Distribution;
