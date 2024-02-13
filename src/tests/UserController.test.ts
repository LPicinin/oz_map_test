import { expect } from "chai";
import { UserController } from "../controllers/UserController";

describe("UserController", () => {
  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const req: any = { query: { page: 1, limit: 10 } };
      const res: any = {};
      UserController.list(req, res).then((result) => {
        expect(result).to.be.an("array");
      });
    });
  });
});
