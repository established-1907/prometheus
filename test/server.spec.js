import { test } from 'tap';
import { build } from '../server/app.js';

test('TEST the /healthcheck route', async t => {
  const fastify = build();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: 'GET',
    url: '/healthcheck'
  });

  fastify.log.info(response);

  t.equal(response.statusCode, 200, 'StatusCode Check');
  t.same(response.json(), { say: 'Pong. I am here' }, 'message response check');

  t.end();
});
