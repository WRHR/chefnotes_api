import { BaseEntity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Field } from 'type-graphql'
import { Ingredient } from './Ingredient'

export default class NoteIngredient extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  content:string

  @Field()
  @PrimaryColumn()
  ingredientId:number

  @ManyToOne(()=>
  Ingredient, ingredient => ingredient.notes)
  ingredient:Ingredient
}