import { Request, Response } from "express";
import { Region, RegionModel, UserModel } from "../models/Models";
import HttpStatusCode from "../utils";

export const RegionController = {
  async list(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    try {
      const skip = (parsedPage - 1) * parsedLimit;
      const [users, total] = await Promise.all([
        RegionModel.find().skip(skip).limit(parsedLimit).lean(),
        RegionModel.countDocuments(),
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
        .json({ error: "Internal server error when found Regions" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, coordinates, id_user } = req.body;
      const user = await UserModel.findOne({ _id: id_user });

      if (!user)
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Usuário não encontrado" });

      const region = new RegionModel({
        name,
        coordinates,
        user,
      });

      await region.save();
      return res.status(HttpStatusCode.CREATED).json(region);
    } catch (err) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: err.message });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, coordinates, id_user } = req.body;

    const region = await RegionModel.findById(id);
    if (!region)
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Region not found" });
    const user = await UserModel.findById(id_user);

    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    region.name = name;
    region.coordinates = coordinates;
    region.user = user;

    await region.save();
    return res.status(HttpStatusCode.OK).json(region);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const region = await RegionModel.findById(id);
    if (region) {
      await region.deleteOne();
      res.status(HttpStatusCode.OK).json(region);
    } else
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Region not found for deletion" });
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const region = await RegionModel.findById(id);
    if (region) res.status(HttpStatusCode.OK).json(region);
    else
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Region not found" });
  },

  async findRegionsContainingPoint(req: Request, res: Response) {
    const { latitude, longitude } = req.query;
    try {
      // Converta latitude e longitude para números
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);

      // Execute a consulta espacial
      const regions = await RegionModel.find({
        geometry: {
          $geoIntersects: {
            $geometry: {
              type: "Point",
              coordinates: [lat, lng], // A ordem é [longitude, latitude]
            },
          },
        },
      });

      return res.json({
        regions,
      });
    } catch (error) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error when found Regions" });
    }
  },

  async findRegionsNearPoint(req: Request, res: Response) {
    const { latitude, longitude, distance, userId } = req.query;

    try {
      // Converter latitude, longitude e distância para números
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const dist = parseFloat(distance as string);

      // Consulta para encontrar regiões dentro de uma certa distância do ponto específico
      let query: any = {
        geometry: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: dist,
          },
        },
      };

      // Adicionar filtro para usuário, se fornecido
      if (userId) {
        query.userId = userId;
      }

      // Executar a consulta
      const regions = await RegionModel.find(query);

      return res.json({
        regions,
      });
    } catch (error) {
      console.error("Erro ao buscar regiões:", error);
      return res.status(500).json({ error: "Erro ao buscar regiões" });
    }
  },
};
