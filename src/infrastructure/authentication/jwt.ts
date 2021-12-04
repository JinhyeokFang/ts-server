import jwt, { JwtPayload } from 'jsonwebtoken';
import environmentVariablesLoader from '../constants/environmentVariablesLoader';

export interface ITokenData extends JwtPayload {
  isAccessToken: boolean,
  username: string
}

class JWT {
  public key: string = environmentVariablesLoader.variables.SECRET_KEY;

  public setKey(newKey: string): void {
    this.key = newKey;
  }

  public async sign(isAccessToken: boolean, username: string): Promise<string> {
    const tokenData: ITokenData = {
      isAccessToken,
      username,
    };
    const token: string = await jwt.sign(tokenData, this.key, { expiresIn: isAccessToken ? '1d' : '1m' });
    return token;
  }

  public async verify(token: string): Promise<ITokenData> {
    try {
      const data: ITokenData = await jwt.verify(token, this.key) as ITokenData;
      return data;
    } catch (error) {
      throw Error('잘못된 토큰입니다.');
    }
  }
}

export default new JWT();
