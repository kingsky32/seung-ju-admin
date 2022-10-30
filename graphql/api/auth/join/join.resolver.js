import { ApolloError } from 'apollo-server-micro';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    async join(parent, args, { prisma }) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (user) throw new ApolloError('This account already exists.');
      const password = await bcrypt.hash(args.password, 10);
      return prisma.user.create({ data: { ...args, password } });
    },
  },
};
