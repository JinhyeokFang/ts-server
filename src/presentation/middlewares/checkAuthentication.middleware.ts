import { Request, Response, NextFunction } from 'express';
import { responseBadRequest, responseUnauthorized } from 'ts-response';
import { Token, Authorization } from '../interfaces/authorization.interface';

export default class CheckAuthorization {
  private authorization: Authorization;

  constructor(authorization: Authorization) {
    this.authorization = authorization;
  }

  async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: string | string[] | undefined = req.headers.Authorization
       || req.headers.authorization;
    if (!token) {
      responseUnauthorized(res, { errorMessage: '토큰이 요청 헤더에 존재하지 않습니다.' });
      return;
    }

    if (token instanceof Array) {
      responseBadRequest(res, { errorMessage: '토큰은 string[]이 아니라 string이어야 합니다.' });
      return;
    }

    try {
      const data: Token = await this.authorization.verify(token);
      if (data.isAccessToken === false) {
        responseUnauthorized(res, { errorMessage: 'AccessToken만 가능합니다.' });
        return;
      }
      res.locals.username = data.username;
      next();
    } catch (err) {
      responseUnauthorized(res, { errorMessage: '잘못되었거나 만료된 토큰입니다.' });
    }
  }
}
