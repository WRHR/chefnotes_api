import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import NoteRecipe from "../entities/NoteRecipe";

@Resolver(NoteRecipe)
export class NoteRecipeResolver {
  @Query(() => [NoteRecipe])
  async recipeNotes(
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<NoteRecipe[]> {
    return NoteRecipe.find({ recipeId });
  }

  @Mutation(() => NoteRecipe)
  async createNoteRecipe(
    @Arg("recipeId", () => Int) recipeId: number,
    @Arg("conent") content: string
  ): Promise<NoteRecipe> {
    return NoteRecipe.create({ recipeId, content });
  }

  @Mutation(() => NoteRecipe)
  async updateRecipeNote(
    @Arg("id", () => Int) id: number,
    @Arg("content") content: string
  ): Promise<NoteRecipe | null> {
    return (await NoteRecipe.update({ id }, { content })).raw[0];
  }

  @Mutation(() => Boolean)
  async deleteNoteRecipe(@Arg("id", () => Int) id: number): Promise<Boolean> {
    NoteRecipe.delete({ id });
    return true;
  }
}
