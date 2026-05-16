import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { orchestrator } from './orchestrator';
import { logger } from './logger';
import { EARequest } from './types/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  logger.info({ method: req.method, path: req.path }, 'Incoming request');
  next();
});

// Health check (required by Cloud Run)
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
});

// Generate EA artefacts
app.post('/artefacts/generate', async (req: Request, res: Response) => {
  try {
    const { topic, context, constraints, requestedArtefacts, userId } = req.body;

    if (!topic) {
      res.status(400).json({ error: 'topic is required' });
      return;
    }

    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    logger.info(
      { requestId, topic, userId: userId || 'anonymous' },
      'EA generation requested'
    );

    const eaRequest: EARequest = {
      id: requestId,
      topic,
      context,
      constraints,
      requestedArtefacts: requestedArtefacts || ['governance', 'strategy', 'design'],
      userId: userId || 'anonymous',
      timestamp: new Date(),
    };

    const result = await orchestrator.execute(eaRequest);

    res.json({
      requestId: result.requestId,
      phase: result.phase,
      artefactCount: result.artefacts.length,
      artefacts: result.artefacts.map(a => ({
        id: a.id,
        type: a.type,
        metadata: a.metadata,
        contentPreview: a.content.slice(0, 500),
        contentLength: a.content.length,
      })),
      errors: result.errors,
      duration: result.duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error({ error }, 'Generation request failed');
    res.status(500).json({
      error: 'Generation failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

// Retrieve full artefact content
app.get('/artefacts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info({ id }, 'Artefact retrieval requested');

    // In MVP, we return a placeholder
    // In production, this would retrieve from GitHub or cache
    res.status(501).json({
      error: 'Not implemented',
      message: 'Full artefact retrieval coming in Phase 2',
    });
  } catch (error) {
    logger.error({ error }, 'Retrieval request failed');
    res.status(500).json({
      error: 'Retrieval failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

// Status endpoint
app.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'operational',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  logger.error({ error: err }, 'Unhandled error');
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// Start server
const server = app.listen(port, () => {
  logger.info({ port }, 'VAF Agentic Architect v2 listening');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
