module.exports = {
  Query: {
    user: (_, { id }, { prisma }) => {
      return prisma.user({ id });
    },
  },
};
