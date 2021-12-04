import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Order from './order.entity';

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Order, (order) => order.id)
    orders: Order[];
}
