import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/App.errors.js";

interface JwtPayload {
  acess: number;
}

class Autentificate {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = Autentificate.getToken(req);

    const decode = jwt.verify(token, process.env.SKJWT as string) as JwtPayload;

    (req as any).user = decode;

    next();
  }

  static async validateAdminAcess(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = (req as any).user as JwtPayload;

    if (user.acess != 2) throw AppError.unauthorized("Acesso negado");

    next();
  }

  static getToken(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw AppError.unauthorized("Token não informado");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw AppError.unauthorized("Token malformado");
    }

    return token;
  }
}

export { Autentificate };
