import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.js';
import fs from 'fs';
import path from 'path';

const privateKey= fs.readFileSync(path.resolve(process.env.PRIVATE_KEY_PATH || ''), 'utf-8');
const publicKey= fs.readFileSync(path.resolve(process.env.PUBLIC_KEY_PATH || ''), 'utf-8');

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

export const verifyToken= (token:string): { id: number; email: string; role: string } => {
  try {
    const decoded= jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    }) as JwtPayload;

    if (decoded && typeof decoded === 'object' && 'id' in decoded && 'email' in decoded && 'role' in decoded) {
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    
    } else {
      throw new Error("Token tidak valid.");
    }

  } catch (err) {
    throw new Error("Token tidak valid.");
  }
}

export {
  privateKey,
  publicKey
}