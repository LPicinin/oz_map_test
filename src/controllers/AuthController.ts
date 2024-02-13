import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import HttpStatusCode from "../utils";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await AuthService.login(username, password);
    if (!user)
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Usuário não encontrado" });
    else
      return res
        .status(HttpStatusCode.OK)
        .json({ token: await AuthService.generateToken(user, "2h") });
  },
};
