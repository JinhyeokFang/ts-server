import {createConnection, Connection} from "typeorm";
import { Menu } from "../../domain/menu.entity";
import { Order } from "../../domain/order.entity";
import { User } from "../../domain/user.entity";
import logger from "../logger/logger";

class TypeOrmConnector {
    private databaseConnection: Connection;

    private async createConnection(): Promise<void> {
        try {
            this.databaseConnection = await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "jinhyeokfang",
                password: "146742",
                database: "test",
                entities: [User, Order, Menu],
                synchronize: true,
            });
        } catch (error: unknown) {
            logger.error(''+error);
            logger.error('프로세스를 정지합니다.');
            process.exit();
        }
    }

    public async getConnection() {
        if (this.databaseConnection == null)
            await this.createConnection();
        return this.databaseConnection;
    }
};

export default new TypeOrmConnector();
