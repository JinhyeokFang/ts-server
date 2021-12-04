import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/infrastructure/orm/migrations/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

export default config;
