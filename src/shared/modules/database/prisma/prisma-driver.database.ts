import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  DriverRepository,
  ICreateDriver,
} from "src/modules/driver/interfaces/prisma-driver-repository";

@Injectable()
export class PrismaDriverDatabase implements DriverRepository {
  constructor(private prisma: PrismaService) {}

  async createDriver(data: ICreateDriver) {
    await this.prisma.drivers.create({ data });
    return;
  }
}
