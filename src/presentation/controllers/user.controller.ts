import { Request, Response, Router } from 'express';
import {
  BadRequestError, errorHandling, InternalServerError, responseOK,
} from 'ts-response';
import UserService from '../../application/services/user.service';
import { Controller } from '../interfaces/controller.interface';
import CheckAuthorization from '../middlewares/checkAuthentication.middleware';
import logger from '../../infrastructure/logger/winston';
import { Authorization } from '../interfaces/authorization.interface';
import bcrypt from '../../infrastructure/encryption/bcrypt';

export default class UserController implements Controller {
  public router = Router();

  public baseURL = '/user';

  private userService: UserService = new UserService(bcrypt);

  private authorization: Authorization;

  constructor(authorization: Authorization) {
    this.authorization = authorization;

    this.router.post('/login', this.login(this));
    this.router.post('/register', this.register(this));
    this.router.use(new CheckAuthorization(authorization).middleware);
  }

  /**
  *  @swagger
  *  paths:
  *   /login:
  *      post:
  *        tags: [SignIn]
  *        summary: 로그인 로직 처리
  *        parameters:
  *          - name: email
  *            type: string
  *            description: 아이디(이메일)
  *          - name: password
  *            type: string
  *            description: 비밀번호
  *        responses:
  *          "200":
  *            discription: 로그인 성공
  *            content:
  *              application:json
  *          "400":
  *            discription: 잘못된 요청
  */
  private login(controller: UserController): (req: Request, res: Response) => void {
    return async function (req: Request, res: Response) {
      try {
        const { email, password } = req.body;
        if (email === undefined || password === undefined) throw new BadRequestError('잘못된 요청');

        await controller.userService.login({
          email, password,
        });

        responseOK(res, {
          data: {
            accessToken: await controller.authorization.sign(true, email),
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) errorHandling(res, error);
        else errorHandling(res, new InternalServerError(`${error}`));

        logger.error(`${error}`);
      }
    };
  }

  private register(controller: UserController): (req: Request, res: Response) => void {
    return async function (req: Request, res: Response) {
      try {
        const { email, password, name } = req.body;
        if (email === undefined || password === undefined || name === undefined) throw new BadRequestError('잘못된 요청');

        await controller.userService.register({
          email, password, name,
        });
        responseOK(res, {});
      } catch (error) {
        if (error instanceof Error) errorHandling(res, error);
        else errorHandling(res, new InternalServerError(`${error}`));
        logger.error(`${error}`);
      }
    };
  }
}
