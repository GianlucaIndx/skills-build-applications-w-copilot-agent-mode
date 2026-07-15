import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const codespacesPortFrontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : '';
const codespacesEditorOrigin = codespaceName ? `https://${codespaceName}.github.dev` : '';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (
        origin === 'http://localhost:5173' ||
        origin === 'http://127.0.0.1:5173' ||
        origin === codespacesPortFrontendOrigin ||
        origin === codespacesEditorOrigin
      ) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
  console.log(`Backend API base URL: ${apiBaseUrl}`);
});
