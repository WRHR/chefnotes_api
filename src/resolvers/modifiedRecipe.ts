import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { ModifiedRecipe } from "../entities/ModifiedRecipe";

@InputType()
class RecipeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  baseRecipeId: number;
}

@ObjectType()
class PaginatedRecipes {
  @Field(() => [ModifiedRecipe])
  recipes: ModifiedRecipe[];

  @Field()
  hasMore: boolean;
}

@Resolver(ModifiedRecipe)
export class ModifiedRecipeResolver {
  @Query(() => [ModifiedRecipe])
  async modifiedRecipesAll(): Promise<ModifiedRecipe[]> {
    return ModifiedRecipe.find();
  }

  @Query(() => PaginatedRecipes)
  async modifiedRecipes(
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

  @Query(() => ModifiedRecipe, { nullable: true })
  modifiedRecipe(
    @Arg("id", () => Int) id: number
  ): Promise<ModifiedRecipe | undefined> {
    return ModifiedRecipe.findOne(id);
  }

  @Query(() => ModifiedRecipe, { nullable: true })
  async findRecipeMods(
    @Arg("baseRecipeId", () => Int) baseRecipeId: number
  ): Promise<ModifiedRecipe[] | undefined> {
    return ModifiedRecipe.find({ baseRecipeId });
  }

  @Mutation(() => ModifiedRecipe)
  async createModifiedRecipe(
    @Arg("input") input: RecipeInput,
    @Arg("baseRecipeId", () => Int) baseRecipeId: number,
    @Ctx() { req }: MyContext
  ): Promise<ModifiedRecipe> {
    return ModifiedRecipe.create({
      ...input,
      baseRecipeId,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => ModifiedRecipe)
  async updateModifiedRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Ctx() { req }: MyContext
  ): Promise<ModifiedRecipe | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(ModifiedRecipe)
      .set({ name, description })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteModifiedRecipe(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await ModifiedRecipe.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
