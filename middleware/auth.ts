import jwt from 'jsonwebtoken';
import { Response, NextFunction, RequestHandler } from 'express';
import { Request } from '../types';

export const verifyToken = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        let token = req.header('Authorization');

        if (!token) return res.status(402).send('Access Denied');

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimStart();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET ?? '');

        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};