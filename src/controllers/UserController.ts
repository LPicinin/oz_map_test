import { Request, Response } from "express";
import { User, UserModel } from "../models/User";
import { STATUS } from "../utils";

export const UserController = {
  async list(req: Request, res: Response) {
    const { page, limit } = req.query;

    const [users, total] = await Promise.all([
      UserModel.find().lean(),
      UserModel.count(),
    ]);

    return res.json({
      rows: users,
      page,
      limit,
      total,
    });
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, address, coordinates, regions } = req.body;
      const user = new UserModel({
        name,
        email,
        address,
        coordinates,
        regions,
      });

      await user.save();
      return res.status(STATUS.CREATED).json(user);
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({ message: err.message });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, address, coordinates, regions } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      res.status(STATUS.DEFAULT_ERROR).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.address = address;
    user.coordinates = coordinates;
    user.regions = regions;

    await user.save();
    return res.status(STATUS.UPDATED).json(user);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      await user.deleteOne();
      res.status(STATUS.OK).json(user);
    } else
      res.status(STATUS.NOT_FOUND).json({ message: "Usuário não encontrado" });
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) res.status(STATUS.OK).json(user);
    else
      res.status(STATUS.NOT_FOUND).json({ message: "Usuário não encontrado" });
  },
};
