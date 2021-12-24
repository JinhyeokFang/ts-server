import { validate } from 'class-validator';
import dotenv from 'dotenv';
import { EnvironmentVariables, EnvironmentVariablesLoader, NODE_ENV } from '../../presentation/interfaces/environmentVariables.interface';
import logger from '../logger/winston';
import EnvironmentVariablesForm from './environmentVariableForm';

class EnvLoader implements EnvironmentVariablesLoader {
  private environmentVariables: EnvironmentVariablesForm;

  constructor() {
    dotenv.config();

    this.environmentVariables = new EnvironmentVariablesForm();
    this.environmentVariables.NODE_ENV = this.checkUndefined('NODE_ENV') === 'production' ? NODE_ENV.Production : NODE_ENV.Development;
    this.environmentVariables.PORT = parseInt(this.checkUndefined('PORT'), 10);
    this.environmentVariables.SECRET_KEY = this.checkUndefined('SECRET_KEY');

    validate(this.environmentVariables).catch((e) => {
      logger.error('환경변수 불러오기 실패, 서버 종료');
      logger.error(e);
      process.exit();
    });
  }

  private checkUndefined(variableName: string): string {
    const variable = process.env[variableName];
    if (variable === undefined) {
      logger.error('환경변수 불러오기 실패, 서버 종료');
      process.exit();
    }

    return variable;
  }

  get variables(): EnvironmentVariables {
    return this.environmentVariables;
  }
}

export default new EnvLoader();
