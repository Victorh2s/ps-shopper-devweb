"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const drivers_1 = require("../../../../modules/driver/mock/drivers");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        try {
            await this.$connect();
            const drivers = await this.drivers.findMany();
            if (drivers.length === 0) {
                drivers_1.mockDrivers.map(async (data) => {
                    await this.drivers.create({
                        data: {
                            name: data.name,
                            description: data.description,
                            vehicle: data.vehicle,
                            min_km_fee: data.min_km_fee,
                            min_trip_km: data.min_trip_km,
                            Review: {
                                create: {
                                    rating: data.rating,
                                    comment: data.comment,
                                },
                            },
                        },
                    });
                });
                console.log("Motoristas adicionados automaticamente no banco");
            }
        }
        catch (error) {
            console.error("Erro ao inicializar dados do Prisma:", error);
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map