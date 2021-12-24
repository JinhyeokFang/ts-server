export interface Token {
  isAccessToken: boolean,
  username: string,
}

export interface Authorization {
  sign(isAccessToken: boolean, username: string): Promise<string>;
  verify(str: string): Promise<Token>;
}
