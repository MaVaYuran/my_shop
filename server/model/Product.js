import { Schema, model } from 'mongoose';

const ProductSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, 'Title at least shoud have 5 characters'],
      maxlength: [100, 'Title shoud have maximum 100 characters'],
    },
    description: {
      type: String,
      maxlength: [800, 'Title  shoud have maximum 800 characters'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 50,
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: '',
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = model('Product', ProductSchema);
