import { Request, Response, Router } from "express";
import { errorHandling, InternalServerError, responseOK } from "ts-response";
import { LoginDTO, RegisterDTO } from "../../application/dtos/user.dto";
import userService from "../../application/services/user.service";
import jwt from "../../infrastructure/authentication/jwt";
import { Controller } from "./controller.interface";
import authentication from "../middlewares/authentication.middleware";

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
*   /books:
*      post:
*        tags: [SignIn]
*        summary: 로그인 로직 처리
*        parameters:
*          - name: code
*            in: Post
*            type: string
*            description: 로그인 정보(아이디)
*        responses:
*          "200":
*            discription: 로그인 성공
*            contnet:
*              application:json
*          "400":
*            discription: 잘못된 파라메타 전달
*/
    private async login(req: Request<{}, {}, LoginDTO>, res: Response): Promise<void> {
        const loginDTO = req.body;
        try {
            await userService.login(loginDTO);

            responseOK(res, {
                data: {
                    accessToken: await jwt.sign(true, loginDTO.email),
                },
            });
        } catch (error: unknown) {
            if (error instanceof Error)
                errorHandling(res, error);
            else
                errorHandling(res, new InternalServerError('' + error));
        }
    }

    private async register(req: Request<{}, {}, RegisterDTO>, res: Response): Promise<void> {
        const registerDTO = req.body;
        try {
            await userService.register(registerDTO);
            responseOK(res, {});
        } catch (error) {
            if (error instanceof Error)
                errorHandling(res, error);
            else
                errorHandling(res, new InternalServerError('' + error));
        }
    }   
}