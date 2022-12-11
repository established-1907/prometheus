import test from 'tape';
import { build } from '../server/app.js';

test('TEST the /healthcheck route', async t => {
  const fastify = build();

  t.plan(2);

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: 'GET',
    url: '/healthcheck'
  });

  t.equal(response.statusCode, 200, 'StatusCode Check');
  t.same(response.json(), { say: 'Pong. I am here' }, 'message response check');
});
