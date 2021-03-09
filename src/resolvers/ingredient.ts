
import { Ingredient } from "../entities/Ingredient";
import { Field, InputType, Resolver } from "type-graphql";

@InputType()
class IngredientInput {
  @Field()
  name!: string;
  @Field()
  quantity!: string;
}

@Resolver(Ingredient)
export class IngredientResolver {

}

