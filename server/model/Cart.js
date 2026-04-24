import { Schema, model } from 'mongoose';

const CartSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
CartSchema.methods.calculateTotal = function () {
  this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  return this.totalPrice;
};

CartSchema.pre('save', function () {
  if (this.isModified('items')) {
    this.calculateTotal();
  }
});

export const Cart = model('Cart', CartSchema);
