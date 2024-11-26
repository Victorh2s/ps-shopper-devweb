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
exports.ConfirmRideDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const driver_ride_dto_1 = require("./driver-ride.dto");
class ConfirmRideDto {
}
exports.ConfirmRideDto = ConfirmRideDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: "O campo 'customer_id' precisa ser preenchido no formato 'Texto/String' ",
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'customer_id' precisa ser preenchido.",
    }),
    __metadata("design:type", String)
], ConfirmRideDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: "O campo 'origin' precisa ser preenchido no formato 'Texto/String' ",
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'origin' precisa ser preenchido.",
    }),
    __metadata("design:type", String)
], ConfirmRideDto.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: "O campo 'destination' precisa ser preenchido no formato 'Texto/String' ",
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'destination' precisa ser preenchido.",
    }),
    __metadata("design:type", String)
], ConfirmRideDto.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'distance' precisa ser preenchido.",
    }),
    __metadata("design:type", Number)
], ConfirmRideDto.prototype, "distance", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: "O campo 'duration' precisa ser preenchido no formato 'Texto/String' ",
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'duration' precisa ser preenchido.",
    }),
    __metadata("design:type", String)
], ConfirmRideDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => driver_ride_dto_1.DriverDto),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo 'driver' precisa ser preenchido." }),
    __metadata("design:type", driver_ride_dto_1.DriverDto)
], ConfirmRideDto.prototype, "driver", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'value' precisa ser preenchido.",
    }),
    __metadata("design:type", Number)
], ConfirmRideDto.prototype, "value", void 0);
//# sourceMappingURL=confirm-ride.dto.js.map