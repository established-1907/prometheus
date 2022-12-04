const getHealth = (req, reply) => {
  return reply.send({ say: 'I am super bad' });
};

export default getHealth;
