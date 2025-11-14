import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/App.errors.ts";

interface JwtPayload {
  acess: number;
}

class Autentificate{
    static async validateToken(req: Request, res:Response, next: NextFunction){
        const token = Autentificate.getToken(req)

        const decode = jwt.verify(token, process.env.SKJWT as string) as JwtPayload;

        (req as any).user = decode;

        next()
    }

    static async validateAdminAcess(req: Request, res: Response, next: NextFunction){
        const token = Autentificate.getToken(req)

        const decode = jwt.verify(token, process.env.SKJWT as string) as JwtPayload;
        
        if(decode.acess != 2) throw AppError.unauthorized("Acesso negado");

        next()
    }

    static getToken(req: Request){
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            throw AppError.unauthorized("Token invalid");
        }

        return token;
    }
}

export { Autentificate };