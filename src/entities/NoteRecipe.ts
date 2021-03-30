import { Field } from 'type-graphql'
import { BaseEntity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { BaseRecipe } from './BaseRecipe'

export default class NoteRecipe extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  content:string

  @Field()
  @PrimaryColumn()
  recipeId:number

  @ManyToOne(()=>BaseRecipe, recipe => recipe.notes)
  recipe:BaseRecipe
} 