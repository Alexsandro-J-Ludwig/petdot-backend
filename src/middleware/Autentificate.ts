import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/App.errors.ts";

class Autentificate{
    static async validateToken(req: Request, res:Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            throw AppError.unauthorized("Token");
        }

        const decode = jwt.verify(token, process.env.SKJWT!);

        (req as any).user = decode;

        next()
    }
}

export { Autentificate };