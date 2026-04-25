import { Request, Response } from "express";
import { AuthService } from "@/services";
import { BadRequestError, NotFoundError } from "@/errors";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("E-mail e senha são obrigatórios.");
    }

    const result = await this.authService.login(email, password);
    res.json(result);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
      throw new BadRequestError("ID duplicado não é permitido.");
    }

    const user = await this.authService.findById(id);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    res.json(user);
  };
}
