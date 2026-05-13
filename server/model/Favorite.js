import { Schema, model } from 'mongoose';
const FavoriteSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { timestamps: true },
);
FavoriteSchema.index({ userId: 1, productIds: 1 }, { unique: true });

export const Favorite = model('Favorite', FavoriteSchema);
