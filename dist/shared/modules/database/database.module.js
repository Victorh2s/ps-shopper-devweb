"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_ride_repository_1 = require("../../../modules/ride/interfaces/prisma-ride-repository");
const prisma_ride_database_1 = require("./prisma/prisma-ride.database");
const prisma_driver_repository_1 = require("../../../modules/driver/interfaces/prisma-driver-repository");
const prisma_driver_database_1 = require("./prisma/prisma-driver.database");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: prisma_ride_repository_1.RideRepository,
                useClass: prisma_ride_database_1.PrismaRideDatabase,
            },
            {
                provide: prisma_driver_repository_1.DriverRepository,
                useClass: prisma_driver_database_1.PrismaDriverDatabase,
            },
        ],
        exports: [prisma_ride_repository_1.RideRepository, prisma_driver_repository_1.DriverRepository],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map