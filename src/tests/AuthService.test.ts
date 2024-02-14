import { expect } from "chai";
import { AuthService } from "../services/AuthService";
import { User, UserModel } from "../models/Models";
import { config } from 'dotenv';
config();

describe("AuthController", () => {
  describe("testHashToken", () => {
    it("should an expected hash", async () => {
      const word = "ajhadsgkagsdfyagw54"
      const result = await AuthService.generateHash(word);
      expect(result).equal("84de24f6ace5bb1971a568407d3b197a20fd349856ade18cab55fb30a0ec9360");
    });
  });

  describe("testGenerateToken", () => {
    it("should an token", async () => {
      const user = {_id: "132564879", name: "luis teste"} as User;
      const encode = await AuthService.generateToken(user, "2h");
      const decode = await AuthService.verifyToken(encode);
      expect(decode).to.deep.include(user);
    });
  });
});
