import "reflect-metadata";

import * as mongoose from "mongoose";
import {
  pre,
  getModelForClass,
  Prop,
  Ref,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import lib from "../lib";

import ObjectId = mongoose.Types.ObjectId;
import Base from "./BaseModel";
import { AuthService } from "../services/AuthService";

@pre<User>("save", async function (next) {
  const user = this as Omit<any, keyof User> & User;

  if (user.isModified("coordinates")) {
    user.address = await lib.getAddressFromCoordinates(user.coordinates);
  } else if (user.isModified("address")) {
    const { lat, lng } = await lib.getCoordinatesFromAddress(user.address);

    user.coordinates = [lng, lat];
  }

  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await AuthService.generateHash(user.password);
    user.password = hashedPassword;
  }

  next();
})
export class User extends Base {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: () => [Number] })
  coordinates: [number, number];

  @Prop({ required: true, default: [], ref: () => Region, type: () => String })
  regions: Ref<Region>[];
}

@pre<Region>("save", async function (next) {
  const region = this as Omit<any, keyof Region> & Region;

  if (!region._id) {
    region._id = new ObjectId().toString();
  }

  if (region.isNew) {
    const user = await UserModel.findOne({ _id: region.user });
    user.regions.push(region._id);
    await user.save({ session: region.$session() });
  }

  next(region.validateSync());
})
@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region extends Base {
  @Prop({ required: true, auto: true })
  _id: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, type: () => Array<[Number, Number]> }) // Polígono em GeoJSON
  coordinates!: Array<[number, number]>;

  @Prop({ ref: () => User, required: true, type: () => String })
  user: Ref<User>;
}
export const RegionModel = getModelForClass(Region);
export const UserModel = getModelForClass(User);
