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
exports.RideService = void 0;
const common_1 = require("@nestjs/common");
const prisma_ride_repository_1 = require("../interfaces/prisma-ride-repository");
const prisma_driver_repository_1 = require("../../driver/interfaces/prisma-driver-repository");
const axios_1 = require("../../../shared/utils/api/axios");
const drivers_1 = require("../../driver/mock/drivers");
let RideService = class RideService {
    constructor(driverRepository, rideRepository) {
        this.driverRepository = driverRepository;
        this.rideRepository = rideRepository;
    }
    async calculateRide({ destination, origin }) {
        if (origin === destination) {
            throw new common_1.HttpException({
                error_code: "INVALID_DATA",
                message: "Os endereços de origem e destino não podem ser o mesmo endereço",
            }, 400);
        }
        const { data } = await axios_1.axiosMaps.post(`/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`);
        const distanceInKm = data.routes[0].legs[0].distance.value / 1000;
        const drivers = await this.driverRepository.getDrivers();
        const filterDriverForKm = drivers.filter((driver) => distanceInKm > driver.min_trip_km);
        const driversFormat = filterDriverForKm.map((driver) => {
            const totalValue = driver.min_km_fee * distanceInKm;
            return {
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                    rating: driver.Review[0].rating,
                    comment: driver.Review[0].comment,
                },
                value: +totalValue.toFixed(2),
            };
        });
        const response = {
            origin: {
                latitude: data.routes[0].legs[0].start_location.lat,
                longitude: data.routes[0].legs[0].start_location.lng,
            },
            destination: {
                latitude: data.routes[0].legs[0].end_location.lat,
                longitude: data.routes[0].legs[0].end_location.lng,
            },
            distance: data.routes[0].legs[0].distance.value,
            duration: data.routes[0].legs[0].duration.text,
            options: driversFormat,
            routeResponse: data,
        };
        return response;
    }
    async confirmRide({ customer_id, origin, destination, distance, duration, driver, value, }) {
        if (origin === destination) {
            throw new common_1.HttpException({
                error_code: "INVALID_DATA",
                message: "Os endereços de origem e destino não podem ser o mesmo endereço",
            }, 400);
        }
        const findDriver = drivers_1.mockDrivers.find((item) => item.id === driver.id);
        if (!findDriver) {
            throw new common_1.HttpException({
                error_code: "DRIVER_NOT_FOUND",
                message: "Motorista não encontrado",
            }, 404);
        }
        const distanceInKm = distance / 1000;
        if (findDriver.min_trip_km > distanceInKm) {
            throw new common_1.HttpException({
                error_code: "INVALID_DISTANCE",
                message: "Quilometragem inválida para o motorista",
            }, 406);
        }
        const data = {
            user_id: customer_id,
            origin,
            destination,
            distance,
            duration,
            driver_id: driver.id,
            value,
        };
        await this.rideRepository.createRide({ customer_id, data });
        return {
            success: true,
        };
    }
    async getRidesByCustomerId({ customer_id, driver_id }) {
        if (driver_id) {
            const driver = await this.driverRepository.getDriverById(driver_id);
            if (!driver) {
                throw new common_1.HttpException({
                    error_code: "INVALID_DRIVER",
                    message: "Motorista inválido",
                }, 400);
            }
        }
        const ridesByCustomerId = await this.rideRepository.getRidesByQuerys({
            customer_id,
            driver_id,
        });
        return ridesByCustomerId;
    }
};
exports.RideService = RideService;
exports.RideService = RideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_driver_repository_1.DriverRepository,
        prisma_ride_repository_1.RideRepository])
], RideService);
//# sourceMappingURL=ride.service.js.map