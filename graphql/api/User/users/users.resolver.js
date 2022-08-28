export default {
  Query: {
    users(parent, args, { prisma }) {
      return prisma.user.findMany();
    },
  },
};
