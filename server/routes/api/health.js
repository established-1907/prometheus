import getHealth from '../../handlers/health.js';

const healthOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          say: { type: 'string' }
        }
      }
    }
  },
  handler: getHealth
};

const healthRoute = function (fastify, options, done) {
  fastify.get('/healthcheck', healthOptions);

  done();
};

export default healthRoute;
