import prisma from '#libs/prisma';
import jwt from 'jsonwebtoken';
import { getSession } from 'next-auth/react';

export async function createContext({ req, res }) {
  const token = req.headers.authorization;
  const obj = { prisma };
  const session = await getSession({ req });

  if (session) {
    const { id } = session.user;
    obj.user = await prisma.user.findUnique({ where: { id } });
  } else if (token) {
    const { id } = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET_KEY,
    );
    obj.user = await prisma.user.findUnique({ where: { id } });
  }

  return obj;
}
