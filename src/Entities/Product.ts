import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column({ unique: true })
  ItemCode: string;

  @Column()
  Description: string;

  @Column()
  Quantity: number;

  @Column({ type: "numeric" })
  Price: number;

  @Column({ nullable: true })
  Note: string;

  @Column()
  BuyingDate: Date;
}
