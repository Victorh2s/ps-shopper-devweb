import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { RideRepository } from "src/modules/ride/interfaces/prisma-ride-repository";
import { PrismaRideDatabase } from "./prisma/prisma-ride.database";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";
import { PrismaDriverDatabase } from "./prisma/prisma-driver.database";

@Module({
  providers: [
    PrismaService,
    {
      provide: RideRepository,
      useClass: PrismaRideDatabase,
    },
    {
      provide: DriverRepository,
      useClass: PrismaDriverDatabase,
    },
  ],
  exports: [RideRepository, DriverRepository],
})
export class DatabaseModule {}
