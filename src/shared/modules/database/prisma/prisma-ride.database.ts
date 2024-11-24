import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  IGetRidesByQuerys,
  ISaveRide,
} from "src/modules/ride/interfaces/prisma-ride-repository";

@Injectable()
export class PrismaRideDatabase {
  constructor(private prisma: PrismaService) {}

  async createRide(data: ISaveRide) {
    await this.prisma.rides.create({ data });
    return;
  }

  async getRidesByQuerys({ customer_id, driver_id }: IGetRidesByQuerys) {
    const rides = await this.prisma.rides.findMany({
      where: {
        OR: [{ customer_id }, { driver_id }],
      },
      include: {
        driver: { select: { id: true, name: true } },
      },
    });

    return rides;
  }
}
