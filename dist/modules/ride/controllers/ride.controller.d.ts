import { RideService } from "../services/ride.service";
export declare class RideController {
  private readonly rideService;
  constructor(rideService: RideService);
  calculateRide(): Promise<void>;
}
