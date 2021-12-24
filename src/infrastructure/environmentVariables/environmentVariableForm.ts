import {
  IsIn, IsInt, IsString, Max, Min,
} from 'class-validator';
import { EnvironmentVariables, NODE_ENV } from '../../presentation/interfaces/environmentVariables.interface';

export default class EnvironmentVariablesForm implements EnvironmentVariables {
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
