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
export class Instruction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  position: number;

  @Column()
  original!: Boolean;

  @PrimaryColumn()
  recipeId: number;

  @ManyToOne(() => BaseRecipe, (recipe) => recipe.instructions)
  recipe: BaseRecipe;
}
