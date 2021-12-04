import {
  IsIn, IsInt, IsString, Max, Min,
} from 'class-validator';

export enum NODE_ENV {
    Production = 'production',
    Development = 'development'
}

export class EnvironmentVariables {
    @IsString()
    @IsIn(['production', 'development'])
    NODE_ENV: NODE_ENV;

    @IsInt()
    @Min(1)
    @Max(65535)
    PORT: number;

    @IsString()
    SECRET_KEY: string;
}
