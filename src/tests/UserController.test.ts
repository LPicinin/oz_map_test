import { expect } from 'chai';
import { UserController } from '../controllers/UserController';

describe('UserController', () => {
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const req: any = {};
      const res: any = {
        json: (result: any) => {
          expect(result).to.be.an('array');
        },
        status: (code: number) => {
          return res;
        }
      };
      await UserController.list(req, res);
    });
  });
});