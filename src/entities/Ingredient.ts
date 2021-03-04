import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  quantity!: string;

  @PrimaryColumn()
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: "CASCADE",
  })
  recipe: Recipe;
}
