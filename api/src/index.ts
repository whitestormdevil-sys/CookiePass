import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB, disconnectDB } from './db/connection';
import { defaultLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import shareRoutes from './routes/shares';
import importRoutes from './routes/imports';
import guideRoutes from './routes/guides';
import subscriptionRoutes from './routes/subscription';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// ─── Security & Parsing ─────────────────────────────────────────────────────

app.use(helmet());

// CORS — allow Chrome extension and configured origins
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // Allow all chrome-extension:// origins
      if (origin.startsWith('chrome-extension://')) return callback(null, true);
      // Allow configured origins
      if (corsOrigins.length === 0 || corsOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24h preflight cache
  })
);

app.use(express.json({ limit: '2mb' })); // Allow large encrypted payloads
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ───────────────────────────────────────────────────────────

app.use(defaultLimiter);

// ─── Health Check ────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/auth', authRoutes);
app.use('/shares', shareRoutes);
app.use('/shares', importRoutes); // POST /shares/:id/import
app.use('/guides', guideRoutes);
app.use('/subscription', subscriptionRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// ─── Error Handler ───────────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🍪 CookiePass API running on http://localhost:${PORT}`);
        console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`   Health check: http://localhost:${PORT}/health`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
}

// ─── Graceful Shutdown ───────────────────────────────────────────────────────

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await disconnectDB();
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
