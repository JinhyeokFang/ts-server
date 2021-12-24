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

  public changeMenuInfo(name: string, price: number, description: string): void {
    if (price < 0) {
      throw new Error('올바르지 않은 가격입니다.');
    }

    this.name = name;
    this.price = price;
    this.description = description;
  }
}
