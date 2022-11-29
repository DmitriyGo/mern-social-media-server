import { JwtPayload } from 'jsonwebtoken';
import express from 'express';

export interface Request extends express.Request {
    user?: string | JwtPayload;
}
