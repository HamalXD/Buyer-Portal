import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
//   req: Request,
  res: Response,
//   next: NextFunction,
) => {
  console.error("ERROR:", err);

  /*
    Zod validation error
   */
  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  }

  /*
    Mongo duplicate key error
   */
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value",
    });
  }

  /*
    JWT error
   */
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  /*
    Default error
   */
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};
