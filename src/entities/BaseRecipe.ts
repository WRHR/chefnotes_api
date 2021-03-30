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
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";
import { ModifiedRecipe } from "./ModifiedRecipe";
import NoteRecipe from "./NoteRecipe";
import { User } from "./User";

@ObjectType()
@Entity()
export class BaseRecipe extends BaseEntity {
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

  @OneToMany(() => ModifiedRecipe, (mr) => mr.baseRecipe)
  modifiedRecipes: ModifiedRecipe[];

  @Field()
  @PrimaryColumn()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.recipes)
  creator: User;

  @OneToMany(() => NoteRecipe, (note) => note.recipe)
  notes: NoteRecipe[];
}
