import { Ingredient } from "../entities/Ingredient";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class IngredientInput {
  @Field()
  name!: string;
  @Field()
  quantity!: number;
  @Field()
  measurement!:string
}

@Resolver(Ingredient)
export class IngredientResolver {
  @Query(()=>[Ingredient])
  async recipeIngredients(
    @Arg('recipeId', ()=>Int) recipeId:number,
    @Arg('original')original:Boolean
  ):Promise<Ingredient[]|undefined>{
    return Ingredient.find({recipeId, original})
  }

  @Mutation(() => Ingredient)
  async createIngredient(
    @Arg("input") input: IngredientInput,
    @Arg("original") original: boolean,
    @Arg("recipeId", () => Int) recipeId: number
  ): Promise<Ingredient> {
    return Ingredient.create({
      ...input,
      original,
      recipeId,
    }).save();
  }

  @Mutation(() => Ingredient, { nullable: true })
  async updateIngredient(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: IngredientInput
  ): Promise<Ingredient | null> {
    return (await Ingredient.update({ id }, { ...input })).raw[0];
  }

  @Mutation(() => Boolean)
  async deleteIngredient(@Arg("id", () => Int) id: number) {
    await Ingredient.delete({ id });
    return true;
  }
}
