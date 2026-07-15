import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/users/', (_req, res) => {
  res.status(200).json({ resource: 'users', items: [] });
});

apiRouter.get('/teams/', (_req, res) => {
  res.status(200).json({ resource: 'teams', items: [] });
});

apiRouter.get('/activities/', (_req, res) => {
  res.status(200).json({ resource: 'activities', items: [] });
});

apiRouter.get('/leaderboard/', (_req, res) => {
  res.status(200).json({ resource: 'leaderboard', items: [] });
});

apiRouter.get('/workouts/', (_req, res) => {
  res.status(200).json({ resource: 'workouts', items: [] });
});

export default apiRouter;
