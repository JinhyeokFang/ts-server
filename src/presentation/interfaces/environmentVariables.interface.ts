export enum NODE_ENV {
  Production = 'production',
  Development = 'development'
}

export interface EnvironmentVariables {
  NODE_ENV: NODE_ENV;
  PORT: number;
  SECRET_KEY: string;
}

export interface EnvironmentVariablesLoader {
  get variables(): EnvironmentVariables;
}
