import { PrismaService } from "./prisma.service";
import {
  IGetRidesByQuerys,
  ISaveRide,
  RideRepository,
} from "src/modules/ride/interfaces/prisma-ride-repository";
export declare class PrismaRideDatabase implements RideRepository {
  private prisma;
  constructor(prisma: PrismaService);
  createRide(data: ISaveRide): Promise<void>;
  getRidesByQuerys({ customer_id, driver_id }: IGetRidesByQuerys): Promise<
    ({
      driver: {
        id: number;
        name: string;
      };
    } & {
      customer_id: string;
      driver_id: number;
      id: number;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      value: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    })[]
  >;
}
