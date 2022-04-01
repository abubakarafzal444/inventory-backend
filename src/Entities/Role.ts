import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";

export enum UserType {
  Admin = "Admin",
  Employee = "Employee",
}

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: UserType })
  Role: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
