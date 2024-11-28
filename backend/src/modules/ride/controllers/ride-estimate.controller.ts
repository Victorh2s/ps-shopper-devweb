import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { CalculateRideDto } from "../dtos/calculate-ride.dto";
import { CustomHttpExceptionFilter } from "../../../shared/common/filters/http-exception.filter";
import { CalculateRideService } from "../services/calculate-ride.service";

@Controller("ride")
@UseFilters(CustomHttpExceptionFilter)
export class RideEstimateController {
  constructor(private readonly calculateRideService: CalculateRideService) {}

  @Post("estimate")
  @HttpCode(200)
  async calculateRide(
    @Body()
    { customer_id, destination, origin }: CalculateRideDto,
  ) {
    const result = await this.calculateRideService.execute({
      customer_id,
      destination,
      origin,
    });

    return result;
  }
}
