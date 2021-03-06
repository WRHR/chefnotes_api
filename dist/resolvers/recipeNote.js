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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRecipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const NoteRecipe_1 = __importDefault(require("../entities/NoteRecipe"));
let NoteRecipeResolver = class NoteRecipeResolver {
    recipeNotes(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return NoteRecipe_1.default.find({ recipeId });
        });
    }
    createNoteRecipe(recipeId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return NoteRecipe_1.default.create({ recipeId, content });
        });
    }
    updateRecipeNote(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield NoteRecipe_1.default.update({ id }, { content })).raw[0];
        });
    }
    deleteNoteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            NoteRecipe_1.default.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [NoteRecipe_1.default]),
    __param(0, type_graphql_1.Arg("recipeId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoteRecipeResolver.prototype, "recipeNotes", null);
__decorate([
    type_graphql_1.Mutation(() => NoteRecipe_1.default),
    __param(0, type_graphql_1.Arg("recipeId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("conent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NoteRecipeResolver.prototype, "createNoteRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => NoteRecipe_1.default),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("content")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NoteRecipeResolver.prototype, "updateRecipeNote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoteRecipeResolver.prototype, "deleteNoteRecipe", null);
NoteRecipeResolver = __decorate([
    type_graphql_1.Resolver(NoteRecipe_1.default)
], NoteRecipeResolver);
exports.NoteRecipeResolver = NoteRecipeResolver;
//# sourceMappingURL=recipeNote.js.map