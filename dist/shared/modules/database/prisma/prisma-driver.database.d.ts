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
        id: number;
        rating: number;
        comment: string;
        driver_id: number;
      }[];
    } & {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      min_km_fee: number;
      min_trip_km: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    })[]
  >;
  getDriverById(driver_id: number): Promise<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    min_km_fee: number;
    min_trip_km: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>;
}
