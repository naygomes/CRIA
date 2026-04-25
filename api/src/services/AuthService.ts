import jwt from "jsonwebtoken";
import { IAuthRepository, ILoginResponse, IUser } from "@/types";
import { BadRequestError, InternalServerError } from "@/errors";
import { JWT_SECRET } from "@/settings.js";

export class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new BadRequestError("E-mail ou senha inválidos.");
    }

    if (!JWT_SECRET) {
      throw new InternalServerError(
        "CRITICAL ERROR: A variável de ambiente JWT_SECRET não foi configurada no arquivo .env",
      );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }

  async findById(id: string): Promise<IUser | null> {
    return this.authRepository.findById(id);
  }
}
