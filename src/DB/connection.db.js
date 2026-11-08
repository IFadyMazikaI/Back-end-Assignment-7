import mongoose from 'mongoose';
import {DB_HOST,DB_PORT,DB_NAME} from '../config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        console.log('Database connected successfully ❤️');
    } catch (error) {
        console.log('Database connection failed ❌', error);
    }
};