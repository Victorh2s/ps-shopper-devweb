import { PrismaService } from "./prisma.service";
import {
  DriverRepository,
  ICreateDriver,
} from "src/modules/driver/interfaces/prisma-driver-repository";
export declare class PrismaDriverDatabase implements DriverRepository {
  private prisma;
  constructor(prisma: PrismaService);
  createDriver({
    name,
    description,
    vehicle,
    rating,
    comment,
    min_km_fee,
    min_trip_km,
  }: ICreateDriver): Promise<void>;
  getDrivers(): Promise<
    ({
      Review: {
        driver_id: number;
        id: number;
        rating: number;
        comment: string;
      }[];
    } & {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      name: string;
      description: string;
      vehicle: string;
      min_km_fee: number;
      min_trip_km: number;
    })[]
  >;
}
