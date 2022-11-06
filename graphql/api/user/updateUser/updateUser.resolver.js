export default {
  Mutation: {
    updateUser(parent, args, { prisma, user }) {
      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: args,
      });
    },
  },
};
