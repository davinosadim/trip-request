import { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("BODY RECEBIDO:", req.body);
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erro de validacao nos dados enviados",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
