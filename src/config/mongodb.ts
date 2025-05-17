import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default async function connectMongoDB() {
    try {
        const mongoURI = process.env.MONGO_URI

        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file')
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (e) {
        console.log('mongodb error:', e)
    }
}
