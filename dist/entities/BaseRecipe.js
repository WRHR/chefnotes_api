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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRecipe = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./Ingredient");
const Instruction_1 = require("./Instruction");
const ModifiedRecipe_1 = require("./ModifiedRecipe");
const NoteRecipe_1 = __importDefault(require("./NoteRecipe"));
const User_1 = require("./User");
let BaseRecipe = class BaseRecipe extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BaseRecipe.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BaseRecipe.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BaseRecipe.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => Ingredient_1.Ingredient, (ingredient) => ingredient.recipe),
    __metadata("design:type", Array)
], BaseRecipe.prototype, "ingredients", void 0);
__decorate([
    typeorm_1.OneToMany(() => Instruction_1.Instruction, (instruction) => instruction.recipe),
    __metadata("design:type", Array)
], BaseRecipe.prototype, "instructions", void 0);
__decorate([
    typeorm_1.OneToMany(() => ModifiedRecipe_1.ModifiedRecipe, (mr) => mr.baseRecipe),
    __metadata("design:type", Array)
], BaseRecipe.prototype, "modifiedRecipes", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], BaseRecipe.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.recipes),
    __metadata("design:type", User_1.User)
], BaseRecipe.prototype, "creator", void 0);
__decorate([
    typeorm_1.OneToMany(() => NoteRecipe_1.default, (note) => note.recipe),
    __metadata("design:type", Array)
], BaseRecipe.prototype, "notes", void 0);
BaseRecipe = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], BaseRecipe);
exports.BaseRecipe = BaseRecipe;
//# sourceMappingURL=BaseRecipe.js.map