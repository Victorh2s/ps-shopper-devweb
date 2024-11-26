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
exports.CreateDriverDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDriverDto {
}
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Esse campo precisar preenchido como uma 'String'" }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O nome do motorista precisa ser preenchido.",
    }),
    (0, class_validator_1.MaxLength)(35, {
        message: "O nome do motorista deve ter até 35 caracteres",
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Esse campo precisar preenchido como uma 'String'" }),
    (0, class_validator_1.MaxLength)(250, {
        message: "O descrição do motorista deve ter até 250 caracteres",
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Esse campo precisar preenchido como uma 'String'" }),
    (0, class_validator_1.MaxLength)(150, {
        message: "O descrição do veículo deve ter até 150 caracteres",
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "vehicle", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Esse campo precisar preenchido como uma 'String'" }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo de Taxa mínima por quilômetro do motorista precisa ser preenchido.",
    }),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "min_km_fee", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo de quilometragem minima do motorista precisa ser preenchido.",
    }),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "min_trip_km", void 0);
//# sourceMappingURL=create-driver.dto.js.map