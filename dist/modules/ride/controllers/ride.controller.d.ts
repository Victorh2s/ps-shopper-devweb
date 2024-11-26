import { RideService } from "../services/ride.service";
import { CalculateRideDto } from "../dtos/calculate-ride.dto";
import { ConfirmRideDto } from "../dtos/confirm-ride.dto";
export declare class RideController {
  private readonly rideService;
  constructor(rideService: RideService);
  calculateRide({
    customer_id,
    destination,
    origin,
  }: CalculateRideDto): Promise<{
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
    destination,
    distance,
    driver,
    duration,
    origin,
    value,
  }: ConfirmRideDto): Promise<{
    success: boolean;
  }>;
}
