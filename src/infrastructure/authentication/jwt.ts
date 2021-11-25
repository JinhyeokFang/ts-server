import jwt from 'jsonwebtoken';

export interface ITokenData extends Record<string, unknown> {
  isAccessToken: boolean,
  username: string
}

class JWT {
  public key: string;

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
    const data: ITokenData = await jwt.verify(token, this.key);
    return data;
  }
}

export default new JWT();