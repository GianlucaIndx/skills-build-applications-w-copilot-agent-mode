import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
