import { Schema, model } from 'mongoose';
import roles from '../constants/roles.js';

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.CUSTOMER,
      enum: [roles.ADMIN, roles.CUSTOMER],
    },
  },
  { timestamps: true },
);

export const User = model('User', UserSchema);
