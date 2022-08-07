import prisma from '#libs/prisma';

export async function createContext({ req, res }) {
  return {
    prisma,
  };
}
