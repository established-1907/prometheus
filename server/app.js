import fastify from 'fastify';
import healthRoute from './routes/api/health.js';

export const build = (opts = {}) => {
  const app = fastify(opts);

  app.register(healthRoute);

  app.get('/', async (request, reply) => {
    return reply.send({ message: 'I am broke' });
  });

  return app;
};
