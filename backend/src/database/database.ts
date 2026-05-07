import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const connectDB = async (url?: string): Promise<void> => {
    const conn = mongoose.connection;

    conn.on('connected', () => console.log('MongoDB connection established'));
    conn.on('reconnected', () => console.log('MongoDB connection reestablished'));
    conn.on('disconnected', () => console.log('MongoDB connection disconnected'));
    conn.on('error', (err) => console.error('MongoDB error:', err));

    const target = url ?? process.env.MONGODB_URL;
    if (!target) {
        throw new Error('MONGODB_URL is not set');
    }

    await mongoose.connect(target);
};

export default { connectDB };
