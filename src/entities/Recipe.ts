import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Ingredient } from './Ingredient'
import { Instruction } from './Instruction'
import { User } from './User'

@ObjectType()
@Entity()
export class Recipe extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  name!:string
  
  @Field()
  @Column()
  description!:string

  @OneToMany(()=>Ingredient,(ingredient)=>ingredient.recipe)
  ingredients:Ingredient[]
  
  @OneToMany(()=>Instruction,(instruction)=>instruction.recipe)
  instructions:Instruction[]

  @ManyToOne(()=>User, user=>user.recipes)
  creator:User

}