export default {
  Query: {
    getUser: (_, { id }, { prisma }) => {
      return prisma.user({ id });
    },
  },
};
