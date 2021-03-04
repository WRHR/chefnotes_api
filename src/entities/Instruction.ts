import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Recipe } from './Recipe'

@ObjectType()
@Entity()
export class Instruction extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  description:string

  @Field()
  @Column()
  position:number

  @PrimaryColumn()
  recipeId:number

  @ManyToOne(()=>Recipe, (recipe)=> recipe.instructions)
  recipe:Recipe
}