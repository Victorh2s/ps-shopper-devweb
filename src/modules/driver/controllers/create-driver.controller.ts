import { Body, Controller, Post } from "@nestjs/common";
import { CreateDriverService } from "../services/create-driver.service";
import { CreateDriverDto } from "../dtos/create-driver.dto";

@Controller("driver")
export class CreateDriverController {
  constructor(private readonly createDriverService: CreateDriverService) {}

  @Post("add")
  async createDriver(
    @Body()
    {
      name,
      description,
      vehicle,
      comment,
      rating,
      min_km_fee,
      min_trip_km,
    }: CreateDriverDto,
  ) {
    await this.createDriverService.execute({
      name,
      description,
      comment,
      rating,
      vehicle,
      min_km_fee,
      min_trip_km,
    });
    return { message: "Motorista adicionado com sucesso." };
  }
}
