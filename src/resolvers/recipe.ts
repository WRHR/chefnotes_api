import { User } from "src/entities/User";
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Recipe } from "../entities/Recipe";

@InputType()
class RecipeInput {
  @Field()
  name: String;

  @Field()
  description: string;
}

@ObjectType()
class PaginatedRecipes {
  @Field(() => [Recipe])
  recipes: Recipe[];

  @Field()
  hasMore: boolean;
}

@Resolver(Recipe)
export class RecipeResolver {
  @Query(() => PaginatedRecipes)
  async recipes(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedRecipes> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const recipes = await getConnection().query(
      `
      select 
      `
    );
    return {
      recipes: recipes.slice(0, realLimit),
      hasMore: postMessage.length === realLimitPlusOne,
    };
  }
}
