import { Instruction } from "../entities/Instruction";
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";

@InputType()
class InstructionInput {
  @Field()
  description: string;

  @Field()
  position: number;
}

@Resolver(Instruction)
export class InstructionResolver {
  @Mutation(() => Instruction)
  async createInstruction(
    @Arg("input") input: InstructionInput,
    @Arg("base") base: boolean,
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<Instruction> {
    return Instruction.create({
      ...input,
      base,
      recipeId,
    }).save();
  }

  @Mutation(() => Instruction, { nullable: true })
  async updateInstruction(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: InstructionInput
  ): Promise<Instruction | null> {
    return (await Instruction.update({ id }, { ...input })).raw[0];
  }

  @Mutation(() => Boolean)
  async deleteInstruction(@Arg("id", () => Int) id: number) {
    await Instruction.delete({ id });
    return true;
  }
}
