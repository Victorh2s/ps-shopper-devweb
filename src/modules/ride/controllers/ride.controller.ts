import { Controller, Post } from "@nestjs/common";
import { RideService } from "../services/ride.service";

@Controller("ride")
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post("estimate")
  async calculateRide() {
    return;
  }
}
