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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifiedRecipe = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BaseRecipe_1 = require("./BaseRecipe");
const Ingredient_1 = require("./Ingredient");
const Instruction_1 = require("./Instruction");
const User_1 = require("./User");
let ModifiedRecipe = class ModifiedRecipe extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ModifiedRecipe.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ModifiedRecipe.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ModifiedRecipe.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => Ingredient_1.Ingredient, (ingredient) => ingredient.recipe),
    __metadata("design:type", Array)
], ModifiedRecipe.prototype, "ingredients", void 0);
__decorate([
    typeorm_1.OneToMany(() => Instruction_1.Instruction, (instruction) => instruction.recipe),
    __metadata("design:type", Array)
], ModifiedRecipe.prototype, "instructions", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BaseRecipe_1.BaseRecipe, br => br.modifiedRecipes),
    __metadata("design:type", BaseRecipe_1.BaseRecipe)
], ModifiedRecipe.prototype, "baseRecipe", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ModifiedRecipe.prototype, "baseRecipeId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ModifiedRecipe.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.recipes),
    __metadata("design:type", User_1.User)
], ModifiedRecipe.prototype, "creator", void 0);
ModifiedRecipe = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ModifiedRecipe);
exports.ModifiedRecipe = ModifiedRecipe;
//# sourceMappingURL=ModifiedRecipe.js.map