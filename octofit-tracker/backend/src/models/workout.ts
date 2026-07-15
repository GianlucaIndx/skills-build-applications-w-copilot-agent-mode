import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    exercises: [{ type: String, required: true }],
    scheduledFor: { type: Date, required: true },
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
