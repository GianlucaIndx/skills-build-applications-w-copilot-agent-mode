import express from 'express';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
  console.log(`Backend API base URL: ${apiBaseUrl}`);
});
