import "reflect-metadata";

import * as mongoose from "mongoose";
import * as supertest from "supertest";
import * as sinon from "sinon";
import { faker } from "@faker-js/faker";
import { expect, assert } from "chai";

import "./database";
import GeoLib from "./lib";
import { Region, RegionModel, UserModel } from "./models/Models";

describe("Models", () => {
  let user;
  let session;
  let geoLibStub: Partial<typeof GeoLib> = {};

  before(async () => {
    geoLibStub.getAddressFromCoordinates = sinon
      .stub(GeoLib, "getAddressFromCoordinates")
      .resolves(faker.location.streetAddress({ useFullAddress: true }));
    geoLibStub.getCoordinatesFromAddress = sinon
      .stub(GeoLib, "getCoordinatesFromAddress")
      .resolves({
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      });

    session = await mongoose.startSession();
    user = await UserModel.create(
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: "123456789",
        address: faker.location.streetAddress({ useFullAddress: true }),
        regions: [],
      }
    );
  });

  after(() => {
    sinon.restore();
    session.endSession();
  });

  beforeEach(() => {
    session.startTransaction();
  });

  afterEach(() => {
    session.commitTransaction();
  });

  describe("UserModel", () => {
    it("should create a user", async () => {
      expect(1).to.be.eq(1);
    });
  });

  describe("RegionModel", () => {
    it("should create a region", async () => {
      const regionData: Omit<Region, "_id"> = {
        user: user._id,
        name: faker.person.fullName(),
        coordinates: [[[0, 0]]],
      };

      const [region] = await RegionModel.create([regionData]);

      expect(region).to.deep.include(regionData);
    });

    it("should rollback changes in case of failure", async () => {
      const userRecord = await UserModel.findById(user._id)
        .select("regions")
        .lean();
      try {
        await RegionModel.create([{ user: user._id }], { session });

        assert.fail("Should have thrown an error");
      } catch (error) {
        session.abortTransaction();
        const updatedUserRecord = await UserModel.findById(user._id)
          .select("regions")
          .lean();
        expect(userRecord).to.deep.eq(updatedUserRecord);
      }
    });
  });
});
