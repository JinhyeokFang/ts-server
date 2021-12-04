import express from 'express';
import request from 'supertest';

import UserController from '../user.controller';

const app = express();
const userController = new UserController();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userController.baseURL, userController.router);

describe('login 테스트', () => {
  test('controller', async () => {
    const response = await request(app)
      .post('/user/login')
      .type('json')
      .send({
        email: 'jinhyeokfang@gmail.com',
        password: 'password01',
      });
    expect(response.statusCode).toBe(200);
  });
});
