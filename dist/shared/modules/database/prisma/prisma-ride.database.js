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
exports.PrismaRideDatabase = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let PrismaRideDatabase = class PrismaRideDatabase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRide({ customer_id, data }) {
        const findUser = await this.prisma.users.findUnique({
            where: {
                customer_id,
            },
        });
        if (!findUser) {
            await this.prisma.users.create({
                data: {
                    customer_id,
                },
            });
        }
        await this.prisma.rides.create({ data });
        return;
    }
    async getRidesByQuerys({ customer_id, driver_id }) {
        const userId = await this.prisma.users.findUnique({
            where: {
                customer_id,
            },
            select: {
                customer_id: true,
                rides: {
                    select: {
                        id: true,
                        createdAt: true,
                        origin: true,
                        destination: true,
                        distance: true,
                        duration: true,
                        driver: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        value: true,
                    },
                    where: driver_id ? { driver_id: +driver_id } : undefined,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        if (!userId)
            throw new common_1.HttpException({
                error_code: "USER_NOT_FOUND",
                message: "Usuário não foi encontrado com base no customer_id passado",
            }, 404);
        const formattedResponse = {
            customer_id: userId.customer_id,
            rides: userId.rides.map((ride) => ({
                id: ride.id,
                date: ride.createdAt,
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: {
                    id: ride.driver.id,
                    name: ride.driver.name,
                },
                value: ride.value,
            })),
        };
        return formattedResponse;
    }
};
exports.PrismaRideDatabase = PrismaRideDatabase;
exports.PrismaRideDatabase = PrismaRideDatabase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRideDatabase);
//# sourceMappingURL=prisma-ride.database.js.map