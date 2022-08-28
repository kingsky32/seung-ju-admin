import bcrypt from 'bcrypt';

export default {
  Mutation: {
    async join(parent, args, { prisma }) {
      const password = await bcrypt.hash(args.password, 10);
      return prisma.user.create({ data: { ...args, password } });
    },
  },
};
