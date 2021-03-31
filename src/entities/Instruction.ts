import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { BaseRecipe } from './BaseRecipe'
import NoteInstruction from './NoteInstruction'

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

  @Column()
  original!:Boolean

  @PrimaryColumn()
  recipeId:number

  @ManyToOne(()=>BaseRecipe, (recipe)=> recipe.instructions)
  recipe:BaseRecipe

  @OneToMany(()=>NoteInstruction, ni => ni.instruction)
  notes:NoteInstruction[]
}