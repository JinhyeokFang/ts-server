import { Request, Response, Router } from 'express';
import {
  BadRequestError, errorHandling, InternalServerError, responseOK,
} from 'ts-response';
import userService from '../../application/services/user.service';
import jwt from '../../infrastructure/authentication/jwt';
import { Controller } from './controller.interface';
import authentication from '../middlewares/authentication.middleware';
import logger from '../../infrastructure/logger/logger';

export default class UserController implements Controller {
    public router = Router();

    public baseURL = '/user';

    public constructor() {
      this.router.post('/login', this.login);
      this.router.post('/register', this.register);
      this.router.use(authentication);
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
    private async login(req: Request, res: Response): Promise<void> {
      try {
        const { email, password } = req.body;
        if (email === undefined || password === undefined) throw new BadRequestError('잘못된 요청');

        await userService.login({
          email, password,
        });

        responseOK(res, {
          data: {
            accessToken: await jwt.sign(true, email),
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) errorHandling(res, error);
        else errorHandling(res, new InternalServerError(`${error}`));
        logger.error(`${error}`);
      }
    }

    private async register(req: Request, res: Response): Promise<void> {
      try {
        const { email, password, name } = req.body;
        if (email === undefined || password === undefined || name === undefined) throw new BadRequestError('잘못된 요청');

        await userService.register({
          email, password, name,
        });
        responseOK(res, {});
      } catch (error) {
        if (error instanceof Error) errorHandling(res, error);
        else errorHandling(res, new InternalServerError(`${error}`));
        logger.error(`${error}`);
      }
    }
}
