import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError, InternalServerError } from "@/errors";
import { ITokenPayload } from "@/types";
import { JWT_SECRET } from "@/settings.js";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token JWT não fornecido.");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new UnauthorizedError("Formato de token inválido.");
  }

  const secret = JWT_SECRET;
  if (!secret) {
    throw new InternalServerError(
      "CRITICAL ERROR: A variável de ambiente JWT_SECRET não foi configurada no arquivo .env",
    );
  }

  try {
    const decoded = jwt.verify(token, secret) as ITokenPayload;

    req.user = decoded;

    return next();
  } catch (error) {
    throw new UnauthorizedError("Token JWT inválido ou expirado.");
  }
}
