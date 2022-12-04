import fastify from 'fastify';

import { build } from './app.js';

const app = build({ logger: true });

const startServer = async () => {
  try {
    app.listen({ port: process.env.PORT || 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exitCode(1);
  }
};

startServer();
