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
import NoteIngredient from "./NoteIngredient";

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

  @OneToMany(()=>NoteIngredient, ni => ni.ingredient)
  notes: NoteIngredient[]
}
