import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import fs from 'fs';
import path from 'path';

const privateKey= fs.readFileSync(path.resolve(process.env.PRIVATE_KEY_PATH || ''), 'utf-8');
const publicKey= fs.readFileSync(path.resolve(process.env.PUBLIC_KEY_PATH || ''), 'utf-8');

export const generateToken= (user:User) => {
  const payload= {
    id: user.id,
    email: user.email
  };
  const token= jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1d"
  });
  return token;
}

export const verifyToken= (token:string): object => {
  try {
    const decoded= jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    });
    return decoded as object;
  } catch (err) {
    throw new Error("Token tidak valid.");
  }
}

export {
  privateKey,
  publicKey
}