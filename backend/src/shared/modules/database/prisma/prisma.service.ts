import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { mockDrivers } from "src/modules/driver/mock/drivers";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();

      const drivers = await this.drivers.findMany();

      if (drivers.length === 0) {
        for (const data of mockDrivers) {
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
        }
        console.log(
          "Motoristas adicionados automaticamente no banco, na ordem definida.",
        );
      }
    } catch (error) {
      console.error("Erro ao inicializar dados do Prisma:", error);
    }
  }
}
