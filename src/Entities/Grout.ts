import { Entity, Column } from "typeorm";
import { Product } from "./Product";

export enum GroutTypes {
  Grey = "grey",
}

@Entity("grout")
export class Grout extends Product {
  @Column()
  Weight: Number;

  @Column({ type: "enum", enum: GroutTypes })
  Color: string;
}
