import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { loadConfig } from './config.js';
import { getDatabase, closeDatabase } from './db/connection.js';
import { handleRoutes } from './routes/handles.js';
import { authRoutes } from './routes/auth.js';
import { oauthRoutes } from './routes/oauth.js';
import { wellknownRoutes } from './routes/wellknown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = loadConfig();
const db = getDatabase(config.databasePath);

// Create Fastify instance
const fastify = Fastify({
  logger: {
    transport: config.isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  },
});

// Decorate Fastify instance with db and config
fastify.decorate('db', db);
fastify.decorate('config', config);

// Register plugins
await fastify.register(cookie, {
  secret: config.sessionSecret,
  hook: 'onRequest',
});

await fastify.register(cors, {
  origin: config.isDevelopment ? true : [config.origin],
  credentials: true,
});

await fastify.register(rateLimit, {
  max: config.rateLimitMax,
  timeWindow: config.rateLimitWindow,
});

// Register routes
await fastify.register(handleRoutes);
await fastify.register(authRoutes);
await fastify.register(oauthRoutes);
await fastify.register(wellknownRoutes);

// Serve client static files (production build)
const clientDistPath = join(__dirname, '..', '..', 'client', 'dist');
if (existsSync(clientDistPath)) {
  await fastify.register(fastifyStatic, {
    root: clientDistPath,
    prefix: '/',
    wildcard: false,
  });
}

// Health check
fastify.get('/health', async () => {
  return {
    status: 'ok',
    instance: config.instanceDomain,
    version: '0.1.0',
  };
});

// SPA fallback: serve index.html for client-side routes
// Must be registered AFTER API routes so they take priority
const clientIndexPath = join(clientDistPath, 'index.html');
if (existsSync(clientIndexPath)) {
  fastify.setNotFoundHandler(async (request, reply) => {
    // Only serve index.html for non-API, non-well-known requests (browser navigation)
    if (
      !request.url.startsWith('/api/') &&
      !request.url.startsWith('/.well-known/') &&
      !request.url.startsWith('/health') &&
      request.headers.accept?.includes('text/html')
    ) {
      return reply.type('text/html').sendFile('index.html');
    }
    return reply.status(404).send({
      message: `Route ${request.method}:${request.url} not found`,
      error: 'Not Found',
      statusCode: 404,
    });
  });
}

// Graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    await fastify.close();
    closeDatabase();
    process.exit(0);
  });
});

// Start server
try {
  await fastify.listen({
    host: config.host,
    port: config.port,
  });

  console.log(`\n🚀 UHP Reference Server running`);
  console.log(`📍 Instance: ${config.instanceDomain}`);
  console.log(`🔗 API: http://localhost:${config.port}`);
  console.log(`🗄️  Database: ${config.databasePath}`);
  if (existsSync(clientIndexPath)) {
    console.log(`🌐 Client: http://localhost:${config.port} (serving built client)`);
  } else {
    console.log(`💡 Client: Run 'npm run dev' from project root to start both server + client`);
    console.log(`   Or run 'npm run build' first, then the client is served at http://localhost:${config.port}`);
  }
  console.log();
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

export { fastify, db, config };
