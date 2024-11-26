import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  DriverRepository,
  ICreateDriver,
} from "src/modules/driver/interfaces/prisma-driver-repository";

@Injectable()
export class PrismaDriverDatabase implements DriverRepository {
  constructor(private prisma: PrismaService) {}

  async createDriver({
    name,
    description,
    vehicle,
    rating,
    comment,
    min_km_fee,
    min_trip_km,
  }: ICreateDriver) {
    await this.prisma.drivers.create({
      data: {
        name,
        description,
        vehicle,
        min_km_fee,
        min_trip_km,
        Review: {
          create: {
            rating,
            comment,
          },
        },
      },
    });
    return;
  }

  async getDrivers() {
    return await this.prisma.drivers.findMany({
      include: { Review: true },
    });
  }

  async getDriverById(driver_id: number) {
    return await this.prisma.drivers.findUnique({
      where: {
        id: Number(driver_id),
      },
    });
  }
}
