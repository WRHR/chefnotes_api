import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseRecipe } from "./BaseRecipe";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";
import { User } from "./User";

@ObjectType()
@Entity()
export class ModifiedRecipe extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, (instruction) => instruction.recipe)
  instructions: Instruction[];

  @ManyToOne(()=>BaseRecipe, br => br.modifiedRecipes)
  baseRecipe: BaseRecipe

  @Field()
  @PrimaryColumn()
  baseRecipeId:number

  @Field()
  @PrimaryColumn()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.recipes)
  creator: User;
}
