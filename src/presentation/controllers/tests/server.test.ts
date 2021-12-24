import express from 'express';
import request from 'supertest';

import UserController from '../user.controller';
import JWT from '../../../infrastructure/authorization/jwt';

const app = express();
const userController = new UserController(new JWT('TESTSECRETKEY'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userController.baseURL, userController.router);

describe('로그인 테스트', () => {
  test('존재하는 계정으로 로그인 성공', async () => {
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

describe('회원가입 테스트', () => {
  test('잘못된 형식의 이메일로 회원가입', async () => {
    const response = await request(app)
      .post('/user/register')
      .type('json')
      .send({
        email: 'jinhyeokfggmailcom',
        password: 'password01',
      });
    expect(response.statusCode).toBe(400);
  });
});
