import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";
import { RideService } from "../services/ride.service";
import { CalculateRideDto } from "../dtos/calculate-ride.dto";
import { CustomHttpExceptionFilter } from "../../../shared/common/filters/http-exception.filter";
import { ConfirmRideDto } from "../dtos/confirm-ride.dto";
import { GetRidesQueryDto } from "../dtos/get-rides-query.dto";
import { GetRidesParamDto } from "../dtos/get-rides-param.dto";

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
    const result = await this.rideService.confirmRide({
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

  @Get("/:customer_id")
  @HttpCode(200)
  async getRidesByCustomerId(
    @Param() { customer_id }: GetRidesParamDto,
    @Query() { driver_id }: GetRidesQueryDto,
  ) {
    const result = await this.rideService.getRidesByCustomerId({
      customer_id,
      driver_id,
    });

    return result;
  }
}
