import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;
}
