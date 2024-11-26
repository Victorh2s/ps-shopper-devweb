import { RideService } from "../services/ride.service";
import { CalculateRideDto } from "../dtos/calculate-ride.dto";
import { ConfirmRideDto } from "../dtos/confirm-ride.dto";
import { GetRidesQueryDto } from "../dtos/get-rides-query.dto";
import { GetRidesParamDto } from "../dtos/get-rides-param.dto";
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
    destination,
    distance,
    driver,
    duration,
    origin,
    value,
  }: ConfirmRideDto): Promise<{
    success: boolean;
  }>;
  getRidesByCustomerId(
    { customer_id }: GetRidesParamDto,
    { driver_id }: GetRidesQueryDto,
  ): Promise<{
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
