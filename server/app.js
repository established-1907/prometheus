import fastify from 'fastify';
import healthRoute from './routes/api/health.js';
import fs from 'fs';

const contents = fs.readFileSync('package.json', 'utf-8');
const openapiopts = {
  openapi: {
    info: {
      title: 'Learning API Docs',
      description: 'API documentation - inputs, outputs, requirements, etc',
      version: contents.version,
      license: {
        name: contents.license,
        url: 'https://github.com/established-1907/prometheus/LICENSE'
      },
      contact: {
        name: 'API Support',
        email: 'me@space.com',
        url: 'https://support.space.com'
      }
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'developer server',
        variables: {
          port: {
            enum: ['5884', '5000'],
            default: '5000'
          }
        }
      }
    ],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'course', description: 'course related end-points' },
      { name: 'health', description: 'server health related end-points' }
    ],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
};

const uiopts = {
  routePrefix: '/api/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    }
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true
};
export const build = (opts = {}) => {
  const app = fastify(opts);

  app.register(import('@fastify/swagger'), openapiopts);
  app.register(import('@fastify/swagger-ui'), uiopts);
  app.register(healthRoute);

  app.get('/', async (request, reply) => {
    return reply.send({ message: 'I am broke' });
  });

  return app;
};
