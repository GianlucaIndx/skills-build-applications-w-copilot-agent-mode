import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alice Runner', email: 'alice@octofit.dev', level: 4, points: 980 },
      { name: 'Bruno Lifter', email: 'bruno@octofit.dev', level: 3, points: 840 },
      { name: 'Carla Cyclist', email: 'carla@octofit.dev', level: 5, points: 1120 },
    ]);

    await Team.insertMany([
      {
        name: 'Mountain Goats',
        description: 'Trail running and endurance focused team',
        memberIds: [users[0]._id, users[2]._id],
      },
      {
        name: 'Iron Pulse',
        description: 'Strength and HIIT focused team',
        memberIds: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 520,
        recordedAt: new Date('2026-07-14T07:15:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 55,
        caloriesBurned: 460,
        recordedAt: new Date('2026-07-14T18:10:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 68,
        caloriesBurned: 710,
        recordedAt: new Date('2026-07-15T06:45:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[2]._id, points: 1120, rank: 1 },
      { userId: users[0]._id, points: 980, rank: 2 },
      { userId: users[1]._id, points: 840, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        userId: users[0]._id,
        title: 'Speed Intervals',
        difficulty: 'Intermediate',
        exercises: ['800m sprint x6', '5 min recovery jog'],
        scheduledFor: new Date('2026-07-16T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        title: 'Upper Body Power',
        difficulty: 'Intermediate',
        exercises: ['Bench press 5x5', 'Pull ups 4x8', 'Farmer carry 4x40m'],
        scheduledFor: new Date('2026-07-16T17:00:00.000Z'),
      },
      {
        userId: users[2]._id,
        title: 'Hill Ride Endurance',
        difficulty: 'Advanced',
        exercises: ['60 min climb intervals', '15 min cooldown'],
        scheduledFor: new Date('2026-07-17T05:50:00.000Z'),
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
