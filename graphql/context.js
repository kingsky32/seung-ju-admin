import prisma from '#libs/prisma';
import { ApolloError } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';

export async function createContext({ req, res }) {
  const token = req.headers.authorization;
  let user;

  if (token) {
    const { id } = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET_KEY,
    );
    user = await prisma.user.findUnique({ where: { id } });
  }
  return {
    prisma,
    user,
  };
}
