import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User, UserModel } from "../models/Models";

export const AuthService = {
  async login(username: string, password: string) {
    return await UserModel.findOne({
      name: username,
      password: `${await AuthService.generateHash(password)}`,
    });
  },

  async generateToken(user: User, expiresIn: string) {
    const payload = { name: user.name, _id: user._id };
    return jwt.sign(payload, process.env.SECRET_JWT);
  },

  async verifyToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET ?? "lkjasfhgclasfafsdbsa6fd54b6"
      );
    } catch (error) {
      return null;
    }
  },

  async generateHash(password) {
    return crypto
      .createHmac(
        "sha256",
        process.env.SECRET_JWT ?? "lkjasfhgclasfafsdbsa6fd54b6"
      )
      .update(password)
      .digest("hex");
  },
};
