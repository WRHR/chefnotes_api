import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Ingredient } from "./Ingredient";

@ObjectType()
@Entity()
export class NoteIngredient extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @PrimaryColumn()
  ingredientId: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.notes)
  ingredient: Ingredient;
}
