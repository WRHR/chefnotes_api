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
exports.InstructionResolver = void 0;
const Instruction_1 = require("../entities/Instruction");
const type_graphql_1 = require("type-graphql");
let InstructionInput = class InstructionInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InstructionInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], InstructionInput.prototype, "position", void 0);
InstructionInput = __decorate([
    type_graphql_1.InputType()
], InstructionInput);
let InstructionResolver = class InstructionResolver {
    createInstruction(input, recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Instruction_1.Instruction.create(Object.assign(Object.assign({}, input), { recipeId })).save();
        });
    }
    updateInstruction(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Instruction_1.Instruction.update({ id }, Object.assign({}, input))).raw[0];
        });
    }
    deleteInstruction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Instruction_1.Instruction.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Instruction_1.Instruction),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("recipeId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InstructionInput, Number]),
    __metadata("design:returntype", Promise)
], InstructionResolver.prototype, "createInstruction", null);
__decorate([
    type_graphql_1.Mutation(() => Instruction_1.Instruction, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, InstructionInput]),
    __metadata("design:returntype", Promise)
], InstructionResolver.prototype, "updateInstruction", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InstructionResolver.prototype, "deleteInstruction", null);
InstructionResolver = __decorate([
    type_graphql_1.Resolver(Instruction_1.Instruction)
], InstructionResolver);
exports.InstructionResolver = InstructionResolver;
//# sourceMappingURL=instruction.js.map