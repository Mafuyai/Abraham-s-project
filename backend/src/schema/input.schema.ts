import { Schema, model, Document, Types } from 'mongoose';

export type InputCategory =
    | 'Fertilizer'
    | 'Seed'
    | 'Herbicide'
    | 'Pesticide'
    | 'Tool'
    | 'Other';

export interface InputDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    category: InputCategory;
    unit: string;
    stock: number;
    description?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InputSchema = new Schema<InputDocument>(
    {
        name: { type: String, required: true, trim: true },
        category: {
            type: String,
            required: true,
            enum: [
                'Fertilizer',
                'Seed',
                'Herbicide',
                'Pesticide',
                'Tool',
                'Other',
            ],
        },
        unit: { type: String, required: true, trim: true },
        stock: { type: Number, required: true, default: 0, min: 0 },
        description: { type: String, trim: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

InputSchema.index({ name: 1, category: 1 });

export const Input = model<InputDocument>('Input', InputSchema);
export default Input;
