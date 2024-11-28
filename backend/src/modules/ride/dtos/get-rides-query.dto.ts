import { IsOptional } from "class-validator";

export class GetRidesQueryDto {
  @IsOptional()
  driver_id?: number;
}
