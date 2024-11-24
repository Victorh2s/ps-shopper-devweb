import { Body, Controller, Post } from "@nestjs/common";
import { DriverService } from "../services/driver.service";
import { CreateDriverDto } from "../dtos/create-driver.dto";

@Controller("driver")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post("add")
  async createDriver(
    @Body()
    {
      name,
      description,
      rating,
      car,
      min_km_fee,
      min_trip_km,
    }: CreateDriverDto,
  ) {
    await this.driverService.createDriver({
      name,
      description,
      rating,
      car,
      min_km_fee,
      min_trip_km,
    });
    return { message: "Motorista adicionado com sucesso." };
  }
}
