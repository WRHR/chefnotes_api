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
exports.IngredientResolver = void 0;
const Ingredient_1 = require("../entities/Ingredient");
const type_graphql_1 = require("type-graphql");
let IngredientInput = class IngredientInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IngredientInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], IngredientInput.prototype, "quantity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IngredientInput.prototype, "measurement", void 0);
IngredientInput = __decorate([
    type_graphql_1.InputType()
], IngredientInput);
let IngredientResolver = class IngredientResolver {
    recipeIngredients(recipeId, original) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ingredient_1.Ingredient.find({ recipeId, original });
        });
    }
    createIngredient(input, original, recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ingredient_1.Ingredient.create(Object.assign(Object.assign({}, input), { original,
                recipeId })).save();
        });
    }
    updateIngredient(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Ingredient_1.Ingredient.update({ id }, Object.assign({}, input))).raw[0];
        });
    }
    deleteIngredient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Ingredient_1.Ingredient.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Ingredient_1.Ingredient]),
    __param(0, type_graphql_1.Arg('recipeId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('original')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], IngredientResolver.prototype, "recipeIngredients", null);
__decorate([
    type_graphql_1.Mutation(() => Ingredient_1.Ingredient),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("original")),
    __param(2, type_graphql_1.Arg("recipeId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IngredientInput, Boolean, Number]),
    __metadata("design:returntype", Promise)
], IngredientResolver.prototype, "createIngredient", null);
__decorate([
    type_graphql_1.Mutation(() => Ingredient_1.Ingredient, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, IngredientInput]),
    __metadata("design:returntype", Promise)
], IngredientResolver.prototype, "updateIngredient", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IngredientResolver.prototype, "deleteIngredient", null);
IngredientResolver = __decorate([
    type_graphql_1.Resolver(Ingredient_1.Ingredient)
], IngredientResolver);
exports.IngredientResolver = IngredientResolver;
//# sourceMappingURL=ingredient.js.map