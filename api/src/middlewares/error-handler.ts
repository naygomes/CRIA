import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: err.statusCode });
  }

  console.error("[Unhandled Error]:", err);
  return res
    .status(500)
    .json({ message: "Erro interno no servidor.", status: 500 });
}
