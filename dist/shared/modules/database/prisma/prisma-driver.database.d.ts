import { PrismaService } from "./prisma.service";
import {
  DriverRepository,
  ICreateDriver,
} from "src/modules/driver/interfaces/prisma-driver-repository";
export declare class PrismaDriverDatabase implements DriverRepository {
  private prisma;
  constructor(prisma: PrismaService);
  createDriver(data: ICreateDriver): Promise<void>;
}
