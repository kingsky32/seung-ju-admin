import { ApolloError } from 'apollo-server-micro';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    async login(parent, args, { prisma }) {
      const user = await prisma.user.findFirst({
        where: {
          username: args.username,
        },
      });
      if (!user) throw new ApolloError('Incorrect Username');
      const isValid = await bcrypt.compare(args.password, user.password);
      if (!isValid) throw new ApolloError('Incorrect Password');
      return {
        tokenType: 'Bearer',
        accessToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }),
        refreshToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }),
        accessTokenExpiredAt: dayjs()
          .add(
            process.env.ACCESS_TOKEN_EXPIRES_IN.slice(0, -1),
            process.env.ACCESS_TOKEN_EXPIRES_IN.slice(-1),
          )
          .unix(),
        refreshTokenExpiredAt: dayjs()
          .add(
            process.env.REFRESH_TOKEN_EXPIRES_IN.slice(0, -1),
            process.env.REFRESH_TOKEN_EXPIRES_IN.slice(-1),
          )
          .unix(),
      };
    },
  },
};
