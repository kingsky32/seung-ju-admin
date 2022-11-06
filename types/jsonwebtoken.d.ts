import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload extends jwt.JwtPayload {
    id: string;
  }
}
