import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseRecipe } from "./BaseRecipe";

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

  @Column()
  original!:Boolean

  @PrimaryColumn()
  recipeId: number;

  @ManyToOne(() => BaseRecipe, (recipe) => recipe.ingredients, {
    onDelete: "CASCADE",
  })
  recipe: BaseRecipe;
}
