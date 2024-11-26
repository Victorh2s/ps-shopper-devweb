import {
  ICalculateRide,
  IConfirmRide,
  IGetRidesByQuerys,
  RideRepository,
} from "../interfaces/prisma-ride-repository";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";
export declare class RideService {
  private driverRepository;
  private rideRepository;
  constructor(
    driverRepository: DriverRepository,
    rideRepository: RideRepository,
  );
  calculateRide({ destination, origin }: ICalculateRide): Promise<{
    origin: {
      latitude: any;
      longitude: any;
    };
    destination: {
      latitude: any;
      longitude: any;
    };
    distance: any;
    duration: any;
    options: {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
    }[];
    routeResponse: any;
  }>;
  confirmRide({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: IConfirmRide): Promise<{
    success: boolean;
  }>;
  getRidesByCustomerId({ customer_id, driver_id }: IGetRidesByQuerys): Promise<{
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
