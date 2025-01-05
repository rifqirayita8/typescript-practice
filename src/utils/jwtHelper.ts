import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.js';
import fs from 'fs';
import path from 'path';

export const privateKey= fs.readFileSync(path.resolve(process.env.PRIVATE_KEY_PATH || ''), 'utf-8');
export const publicKey= fs.readFileSync(path.resolve(process.env.PUBLIC_KEY_PATH || ''), 'utf-8');

export const generateToken= (user:User) => {
  const payload= {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token= jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1d"
  });
  return token;
}

interface DecodedToken extends User {
  iat: number;
  exp: number;
}

export const verifyToken= (token:string): DecodedToken  => {
  try {
    const decoded= jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    }) as DecodedToken;
    return decoded;

  } catch (err) {
    throw new Error('Token tidak valid');
  }
}