import { Arg, Int, Query, Resolver } from "type-graphql";
import NoteRecipe from "../entities/NoteRecipe";

@Resolver(NoteRecipe)
export class NoteRecipeResolver {
  @Query(() => [NoteRecipe])
  async recipeNotes(
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<NoteRecipe[]> {
    return NoteRecipe.find({ recipeId });
  }
}
