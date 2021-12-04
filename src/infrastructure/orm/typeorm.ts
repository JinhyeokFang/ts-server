import { createConnection, Connection } from 'typeorm';
import config from '../../ormconfig';
import logger from '../logger/logger';

class TypeOrmConnector {
    private databaseConnection: Connection | null = null;

    private async createConnection(): Promise<void> {
      try {
        this.databaseConnection = await createConnection(config);
      } catch (error: unknown) {
        logger.error(`${error}`);
        logger.error('DB 연결 실패, 서버 종료.');
        process.exit();
      }
    }

    public async getConnection(): Promise<Connection> {
      if (this.databaseConnection === null) await this.createConnection();
      if (this.databaseConnection === null) throw new Error('DB 연결 실패');
      return this.databaseConnection;
    }
}

export default new TypeOrmConnector();
