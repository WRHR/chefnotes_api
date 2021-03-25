import { Instruction } from "../entities/Instruction";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class InstructionInput {
  @Field()
  description: string;

  @Field()
  position: number;
}

@Resolver(Instruction)
export class InstructionResolver {
  @Query(() => [Instruction])
  async recipeInstructions(
    @Arg("recipeId", () => Int) recipeId: number,
    @Arg('original')original:Boolean
  ): Promise<Instruction[]> {
    return Instruction.find({ recipeId, original });
  }
  @Mutation(() => Instruction)
  async createInstruction(
    @Arg("input") input: InstructionInput,
    @Arg("original") original: boolean,
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<Instruction> {
    return Instruction.create({
      ...input,
      original,
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
