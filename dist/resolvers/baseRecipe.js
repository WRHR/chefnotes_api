"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRecipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BaseRecipe_1 = require("../entities/BaseRecipe");
let RecipeInput = class RecipeInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RecipeInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RecipeInput.prototype, "description", void 0);
RecipeInput = __decorate([
    type_graphql_1.InputType()
], RecipeInput);
let PaginatedRecipes = class PaginatedRecipes {
};
__decorate([
    type_graphql_1.Field(() => [BaseRecipe_1.BaseRecipe]),
    __metadata("design:type", Array)
], PaginatedRecipes.prototype, "recipes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedRecipes.prototype, "hasMore", void 0);
PaginatedRecipes = __decorate([
    type_graphql_1.ObjectType()
], PaginatedRecipes);
let BaseRecipeResolver = class BaseRecipeResolver {
    recipesAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return BaseRecipe_1.BaseRecipe.find();
        });
    }
    recipes(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const recipes = yield typeorm_1.getConnection().query(`
      select 
      `);
            return {
                recipes: recipes.slice(0, realLimit),
                hasMore: postMessage.length === realLimitPlusOne,
            };
        });
    }
    recipe(id) {
        return BaseRecipe_1.BaseRecipe.findOne(id);
    }
    createRecipe(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return BaseRecipe_1.BaseRecipe.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
        });
    }
    updateRecipe(id, name, description, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(BaseRecipe_1.BaseRecipe)
                .set({ name, description })
                .where('id = :id and "creatorId" = :creatorId', {
                id,
                creatorId: req.session.userId,
            })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteRecipe(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseRecipe_1.BaseRecipe.delete({ id, creatorId: req.session.userId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [BaseRecipe_1.BaseRecipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "recipesAll", null);
__decorate([
    type_graphql_1.Query(() => PaginatedRecipes),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "recipes", null);
__decorate([
    type_graphql_1.Query(() => BaseRecipe_1.BaseRecipe, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "recipe", null);
__decorate([
    type_graphql_1.Mutation(() => BaseRecipe_1.BaseRecipe),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecipeInput, Object]),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "createRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => BaseRecipe_1.BaseRecipe),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("name")),
    __param(2, type_graphql_1.Arg("description")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "updateRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BaseRecipeResolver.prototype, "deleteRecipe", null);
BaseRecipeResolver = __decorate([
    type_graphql_1.Resolver(BaseRecipe_1.BaseRecipe)
], BaseRecipeResolver);
exports.BaseRecipeResolver = BaseRecipeResolver;
//# sourceMappingURL=baseRecipe.js.map