import { Transform } from 'stream';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import { Logger } from '../../presentation/interfaces/logger.interface';

class WinstonLogger implements Logger {
  private options = {
    transports: [
      new WinstonDaily({ // info 레벨 로그 파일 저장
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: 'logs/info',
        filename: '%DATE%.log',
        maxSize: '20m',
        maxFiles: '14d',
        zippedArchive: true,
      }),
      new (winston.transports.Console)(), // 콘솔 출력
      new WinstonDaily({ // error 레벨 로그 파일 저장
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: 'logs/error',
        filename: '%DATE%.log',
        maxSize: '20m',
        maxFiles: '14d',
        zippedArchive: true,
      }),
    ],
  };

  private winstonInstance = winston.createLogger(this.options);

  public stream(message: string): Transform {
    return this.winstonInstance.http(message);
  }

  public async info(str: string): Promise<void> {
    await this.winstonInstance.info(str);
  }

  public async error(str: string): Promise<void> {
    await this.winstonInstance.error(str);
  }
}

export default new WinstonLogger();
