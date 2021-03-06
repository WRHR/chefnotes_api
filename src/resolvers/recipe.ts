import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Recipe } from "../entities/Recipe";
import { User } from "src/entities/User";

@InputType()
class RecipeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
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
  @Query(() => [Recipe])
  async recipesAll(): Promise<Recipe[]> {
    return Recipe.find();
  }

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

  @Query(() => Recipe, { nullable: true })
  recipe(@Arg("id", () => Int) id: number): Promise<Recipe | undefined> {
    return Recipe.findOne(id);
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("input") input: RecipeInput,
    @Ctx() { req }: MyContext
  ): Promise<Recipe> {
    return Recipe.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Ctx() { req }: MyContext
  ): Promise<Recipe | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Recipe)
      .set({ name, description })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }
}
