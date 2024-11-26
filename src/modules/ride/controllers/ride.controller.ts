import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { RideService } from "../services/ride.service";
import { CalculateRideDto } from "../dtos/calculate-ride.dto";
import { CustomHttpExceptionFilter } from "../filters/http-exception.filter";

@Controller("ride")
@UseFilters(CustomHttpExceptionFilter)
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post("estimate")
  @HttpCode(200)
  async calculateRide(
    @Body()
    { customer_id, destination, origin }: CalculateRideDto,
  ) {
    const result = await this.rideService.calculateRide({
      customer_id,
      destination,
      origin,
    });

    return result;
  }
}
