import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @ManyToOne(()=>Recipe, (recipe)=> recipe.instructions)
  recipe:Recipe
}