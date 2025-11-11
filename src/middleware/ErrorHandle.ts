import type { NextFunction, Request } from "express";
import { AppError } from "../erros/App.errors.ts";

class ErrorHandle {
  static errorHandle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(500).json({
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export { ErrorHandle };
