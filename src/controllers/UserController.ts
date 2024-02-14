import { Request, Response } from "express";
import { User, UserModel } from "../models/Models";
import HttpStatusCode from "../utils";

export const UserController = {
  async list(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    try {
      const skip = (parsedPage - 1) * parsedLimit;
      const [users, total] = await Promise.all([
        UserModel.find().skip(skip).limit(parsedLimit).lean(),
        UserModel.countDocuments(),
      ]);

      return res.json({
        rows: users,
        page,
        limit,
        total,
      });
    } catch (error) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Intenral server error when found Users" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, address, coordinates, regions, password } = req.body;
      const user = new UserModel({
        name,
        email,
        address,
        coordinates,
        regions,
        password,
      });

      await user.save();
      return res.status(HttpStatusCode.CREATED).json(user);
    } catch (err) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: err.message });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, address, coordinates, regions, password } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      res.status(HttpStatusCode.NOT_FOUND).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.address = address;
    user.coordinates = coordinates;
    user.regions = regions;
    user.password = password;

    await user.save();
    return res.status(HttpStatusCode.OK).json(user);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      await user.deleteOne();
      res.status(HttpStatusCode.OK).json(user);
    } else
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) res.status(HttpStatusCode.OK).json(user);
    else
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
  },
};
