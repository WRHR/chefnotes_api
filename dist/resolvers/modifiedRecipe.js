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
exports.ModifiedRecipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ModifiedRecipe_1 = require("../entities/ModifiedRecipe");
let ModifiedRecipeInput = class ModifiedRecipeInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ModifiedRecipeInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ModifiedRecipeInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ModifiedRecipeInput.prototype, "baseRecipeId", void 0);
ModifiedRecipeInput = __decorate([
    type_graphql_1.InputType()
], ModifiedRecipeInput);
let ModifiedRecipeResolver = class ModifiedRecipeResolver {
    modifiedRecipesAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return ModifiedRecipe_1.ModifiedRecipe.find();
        });
    }
    modifiedRecipe(id) {
        return ModifiedRecipe_1.ModifiedRecipe.findOne(id);
    }
    findRecipeMods(baseRecipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ModifiedRecipe_1.ModifiedRecipe.find({ baseRecipeId });
        });
    }
    createModifiedRecipe(input, baseRecipeId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return ModifiedRecipe_1.ModifiedRecipe.create(Object.assign(Object.assign({}, input), { baseRecipeId, creatorId: req.session.userId })).save();
        });
    }
    updateModifiedRecipe(id, name, description, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(ModifiedRecipe_1.ModifiedRecipe)
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
    deleteModifiedRecipe(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ModifiedRecipe_1.ModifiedRecipe.delete({ id, creatorId: req.session.userId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [ModifiedRecipe_1.ModifiedRecipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "modifiedRecipesAll", null);
__decorate([
    type_graphql_1.Query(() => ModifiedRecipe_1.ModifiedRecipe, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "modifiedRecipe", null);
__decorate([
    type_graphql_1.Query(() => ModifiedRecipe_1.ModifiedRecipe),
    __param(0, type_graphql_1.Arg("baseRecipeId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "findRecipeMods", null);
__decorate([
    type_graphql_1.Mutation(() => ModifiedRecipe_1.ModifiedRecipe),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("baseRecipeId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ModifiedRecipeInput, Number, Object]),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "createModifiedRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => ModifiedRecipe_1.ModifiedRecipe),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("name")),
    __param(2, type_graphql_1.Arg("description")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "updateModifiedRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ModifiedRecipeResolver.prototype, "deleteModifiedRecipe", null);
ModifiedRecipeResolver = __decorate([
    type_graphql_1.Resolver(ModifiedRecipe_1.ModifiedRecipe)
], ModifiedRecipeResolver);
exports.ModifiedRecipeResolver = ModifiedRecipeResolver;
//# sourceMappingURL=modifiedRecipe.js.map