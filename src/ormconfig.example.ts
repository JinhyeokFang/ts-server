import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/infrastructure/orm/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
    },
};