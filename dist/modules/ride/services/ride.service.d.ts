import {
  ICalculateRide,
  IConfirmRide,
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
      id: any;
      name: any;
      description: any;
      vehicle: any;
      review: {
        rating: any;
        comment: any;
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
}
