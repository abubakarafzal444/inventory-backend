import { Entity, Column } from "typeorm";
import { Product } from "./Product";

export enum TileTypes {
  Bathroom = "bathroom",
  Floor = "floor",
  Wall = "wall",
  Kitchen = "kitchen",
  Outdoor = "outdoor",
}

@Entity("tile")
export class Tile extends Product {
  @Column()
  Size: string;

  @Column({ nullable: true })
  Shade: string;

  @Column({ nullable: true })
  Finishing: string;

  @Column({ type: "enum", enum: TileTypes, nullable: true })
  TileType: string;

  @Column()
  PcsInBox: number;
}
