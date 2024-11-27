import { Body, Controller, HttpCode, Patch, UseFilters } from "@nestjs/common";
import { CustomHttpExceptionFilter } from "../../../shared/common/filters/http-exception.filter";
import { ConfirmRideDto } from "../dtos/confirm-ride.dto";
import { ConfirmRideService } from "../services/confirm-ride.service";

@Controller("ride")
@UseFilters(CustomHttpExceptionFilter)
export class RideConfirmationController {
  constructor(private readonly confirmRideService: ConfirmRideService) {}

  @Patch("/confirm")
  @HttpCode(200)
  async confirmRide(
    @Body()
    {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    }: ConfirmRideDto,
  ) {
    const result = await this.confirmRideService.execute({
      customer_id,
      destination,
      distance,
      duration,
      driver,
      origin,
      value,
    });

    return result;
  }
}
