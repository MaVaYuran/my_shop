import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = model('Category', CategorySchema);
