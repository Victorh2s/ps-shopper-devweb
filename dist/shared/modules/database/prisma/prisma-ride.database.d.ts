import { PrismaService } from "./prisma.service";
import {
  ICreateRide,
  IGetRidesByQuerys,
  RideRepository,
} from "src/modules/ride/interfaces/prisma-ride-repository";
export declare class PrismaRideDatabase implements RideRepository {
  private prisma;
  constructor(prisma: PrismaService);
  createRide({ customer_id, data }: ICreateRide): Promise<void>;
  getRidesByQuerys({ customer_id, driver_id }: IGetRidesByQuerys): Promise<{
    customer_id: string;
    rides: {
      id: number;
      date: Date;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driver: {
        id: number;
        name: string;
      };
      value: number;
    }[];
  }>;
}
