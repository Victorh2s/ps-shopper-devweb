import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { RideRepository } from "src/modules/ride/interfaces/prisma-ride-repository";
import { PrismaRideDatabase } from "./prisma/prisma-ride.database";

@Module({
  providers: [
    PrismaService,
    {
      provide: RideRepository,
      useClass: PrismaRideDatabase,
    },
  ],
  exports: [RideRepository],
})
export class DatabaseModule {}
