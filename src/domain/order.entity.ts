import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";
import { User } from "./user.entity";

export enum OrderStatus {
    Pending,
    OnProcessing,
    Finished
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Menu, menu => menu.id)
    menu: Menu;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Pending })
    status: OrderStatus;
}