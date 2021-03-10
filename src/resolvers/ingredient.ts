import { Ingredient } from "../entities/Ingredient";
import { Arg, Field, InputType, Int, Resolver } from "type-graphql";

@InputType()
class IngredientInput {
  @Field()
  name!: string;
  @Field()
  quantity!: string;
}

@Resolver(Ingredient)
export class IngredientResolver {
  async createIngredient(
    @Arg("input") input: IngredientInput,
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<Ingredient> {
    return Ingredient.create({
      ...input,
      recipeId
    }).save()
  }
}
