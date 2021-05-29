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
}
