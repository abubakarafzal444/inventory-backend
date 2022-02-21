import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column({ unique: true })
  ItemCode: string;

  @Column({ nullable: true })
  Description: string;

  @Column()
  Company: string;

  @Column()
  Quantity: number;

  @Column({ type: "numeric" })
  Price: number;

  @Column({ nullable: true })
  Note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
