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
exports.DriverDto = void 0;
const class_validator_1 = require("class-validator");
class DriverDto {
}
exports.DriverDto = DriverDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "O campo 'id' precisa ser preenchido como número." }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo 'id' precisa ser preenchido." }),
    __metadata("design:type", Number)
], DriverDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: "O campo 'name' precisa ser preenchido no formato 'Texto/String'.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo 'name' precisa ser preenchido." }),
    __metadata("design:type", String)
], DriverDto.prototype, "name", void 0);
//# sourceMappingURL=driver-ride.dto.js.map