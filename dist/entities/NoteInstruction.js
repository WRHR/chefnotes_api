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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Instruction_1 = require("./Instruction");
let NoteInstruction = class NoteInstruction extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], NoteInstruction.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], NoteInstruction.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], NoteInstruction.prototype, "instructionId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Instruction_1.Instruction, (instruction) => instruction.notes),
    __metadata("design:type", Instruction_1.Instruction)
], NoteInstruction.prototype, "instruction", void 0);
NoteInstruction = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], NoteInstruction);
exports.default = NoteInstruction;
//# sourceMappingURL=NoteInstruction.js.map