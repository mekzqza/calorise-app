import mongoose from 'mongoose';

const DEFAULT_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/calorie-app';

export const connectDB = async () => {
  console.log('Connecting to MongoDB...');
 /*  try {
    await mongoose.connect(DEFAULT_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Mongo connection error', error.message);
  } */
};
