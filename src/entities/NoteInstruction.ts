import { Field } from 'type-graphql'
import { BaseEntity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Instruction } from './Instruction'

export default class NoteInstruction extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id:number

  @Field()
  @Column()
  content:string

  @Field()
  @PrimaryColumn()
  instructionId:number

  @ManyToOne(()=>
  Instruction, instruction => instruction.notes)
  instruction:Instruction
}