const getHealth = (req, reply) => {
  return reply.code(200).send({ say: 'Pong. I am here' });
};

export default getHealth;
