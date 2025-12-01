import mongoose from 'mongoose';

const calorieEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const CalorieEntry = mongoose.model('CalorieEntry', calorieEntrySchema);
