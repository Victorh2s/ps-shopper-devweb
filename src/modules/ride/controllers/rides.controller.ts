import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  UseFilters,
} from "@nestjs/common";
import { CustomHttpExceptionFilter } from "../../../shared/common/filters/http-exception.filter";
import { GetRidesQueryDto } from "../dtos/get-rides-query.dto";
import { GetRidesParamDto } from "../dtos/get-rides-param.dto";
import { GetRidesByQuerysService } from "../services/get-rides-by-querys.service";

@Controller("ride")
@UseFilters(CustomHttpExceptionFilter)
export class RidesController {
  constructor(
    private readonly getRidesByQuerysService: GetRidesByQuerysService,
  ) {}

  @Get("/:customer_id")
  @HttpCode(200)
  async getRidesByCustomerId(
    @Param() { customer_id }: GetRidesParamDto,
    @Query() { driver_id }: GetRidesQueryDto,
  ) {
    const result = await this.getRidesByQuerysService.execute({
      customer_id,
      driver_id,
    });

    return result;
  }
}
