import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { ModifiedRecipe } from "../entities/ModifiedRecipe";

@InputType()
class ModifiedRecipeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  baseRecipeId: number;
}

@Resolver(ModifiedRecipe)
export class ModifiedRecipeResolver {
  @Query(() => [ModifiedRecipe])
  async modifiedRecipesAll(): Promise<ModifiedRecipe[]> {
    return ModifiedRecipe.find();
  }

  @Query(() => ModifiedRecipe, { nullable: true })
  modifiedRecipe(
    @Arg("id", () => Int) id: number
  ): Promise<ModifiedRecipe | undefined> {
    return ModifiedRecipe.findOne(id);
  }

  @Query(() => [ModifiedRecipe])
  async findRecipeMods(
    @Arg("baseRecipeId", () => Int) baseRecipeId: number
  ): Promise<ModifiedRecipe[] | undefined> {
    return ModifiedRecipe.find({ baseRecipeId });
  }

  @Mutation(() => ModifiedRecipe)
  async createModifiedRecipe(
    @Arg("input") input: ModifiedRecipeInput,
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
