import { Schema, model, Document, Types } from 'mongoose';

export type ScanAction = 'register' | 'verify' | 'distribute';
export type ScanResult = 'success' | 'unknown_tag' | 'failed';

export interface ScanLogDocument extends Document {
    _id: Types.ObjectId;
    rfidTag: string;
    farmer?: Types.ObjectId;
    officer: Types.ObjectId;
    action: ScanAction;
    result: ScanResult;
    meta?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

const ScanLogSchema = new Schema<ScanLogDocument>(
    {
        rfidTag: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            index: true,
        },
        farmer: { type: Schema.Types.ObjectId, ref: 'Farmer' },
        officer: {
            type: Schema.Types.ObjectId,
            ref: 'Officer',
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: ['register', 'verify', 'distribute'],
        },
        result: {
            type: String,
            enum: ['success', 'unknown_tag', 'failed'],
            required: true,
        },
        meta: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

ScanLogSchema.index({ createdAt: -1 });

export const ScanLog = model<ScanLogDocument>('ScanLog', ScanLogSchema);
export default ScanLog;
