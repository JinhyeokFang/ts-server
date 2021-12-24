import winston, { Logger } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const options = {
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

const logger = winston.createLogger(options);

export default logger; // 로그 남길때 사용할 객체

export function stream(message: string): Logger { // 로그 write stream
  return logger.http(message);
}
