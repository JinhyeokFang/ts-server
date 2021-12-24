import jwt from 'jsonwebtoken';
import { Authorization, Token } from '../../presentation/interfaces/authorization.interface';

export default class JWT implements Authorization {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async sign(isAccessToken: boolean, username: string): Promise<string> {
    const tokenData: Token = {
      isAccessToken,
      username,
    };
    const token: string = await jwt.sign(tokenData, this.key, { expiresIn: isAccessToken ? '1d' : '1m' });
    return token;
  }

  public async verify(token: string): Promise<Token> {
    try {
      const data: Token = await jwt.verify(token, this.key) as Token;
      return data;
    } catch (error) {
      throw Error('잘못된 토큰입니다.');
    }
  }
}
