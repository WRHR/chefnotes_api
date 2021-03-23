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
import { BaseRecipe } from "../entities/BaseRecipe";

@InputType()
class RecipeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}

@ObjectType()
class PaginatedRecipes {
  @Field(() => [BaseRecipe])
  recipes: BaseRecipe[];

  @Field()
  hasMore: boolean;
}

@Resolver(BaseRecipe)
export class BaseRecipeResolver {
  @Query(() => [BaseRecipe])
  async recipesAll(): Promise<BaseRecipe[]> {
    return BaseRecipe.find();
  }

  @Query(() => PaginatedRecipes)
  async baseRecipes(
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

  @Query(() => [BaseRecipe])
  async userBaseRecipes(@Ctx() { req }: MyContext) {
    return BaseRecipe.find({ creatorId: req.session.userId });
  }

  @Query(() => BaseRecipe, { nullable: true })
  baseRecipe(@Arg("id", () => Int) id: number): Promise<BaseRecipe | undefined> {
    return BaseRecipe.findOne(id);
  }

  @Mutation(() => BaseRecipe)
  async createBaseRecipe(
    @Arg("input") input: RecipeInput,
    @Ctx() { req }: MyContext
  ): Promise<BaseRecipe> {
    return BaseRecipe.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => BaseRecipe)
  async updateBaseRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Ctx() { req }: MyContext
  ): Promise<BaseRecipe | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(BaseRecipe)
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
  async deleteBaseRecipe(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await BaseRecipe.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
