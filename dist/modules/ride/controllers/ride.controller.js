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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideController = void 0;
const common_1 = require("@nestjs/common");
const ride_service_1 = require("../services/ride.service");
const calculate_ride_dto_1 = require("../dtos/calculate-ride.dto");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const confirm_ride_dto_1 = require("../dtos/confirm-ride.dto");
let RideController = class RideController {
    constructor(rideService) {
        this.rideService = rideService;
    }
    async calculateRide({ customer_id, destination, origin }) {
        const result = await this.rideService.calculateRide({
            customer_id,
            destination,
            origin,
        });
        return result;
    }
    async confirmRide({ customer_id, destination, distance, driver, duration, origin, value, }) {
        const result = await this.rideService.confirmRide({
            customer_id,
            destination,
            distance,
            duration,
            driver,
            origin,
            value,
        });
        return result;
    }
};
exports.RideController = RideController;
__decorate([
    (0, common_1.Post)("estimate"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_ride_dto_1.CalculateRideDto]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "calculateRide", null);
__decorate([
    (0, common_1.Patch)("/confirm"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_ride_dto_1.ConfirmRideDto]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "confirmRide", null);
exports.RideController = RideController = __decorate([
    (0, common_1.Controller)("ride"),
    (0, common_1.UseFilters)(http_exception_filter_1.CustomHttpExceptionFilter),
    __metadata("design:paramtypes", [ride_service_1.RideService])
], RideController);
//# sourceMappingURL=ride.controller.js.map