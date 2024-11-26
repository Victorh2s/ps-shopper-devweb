import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { DriverDto } from "./driver-ride.dto";

export class ConfirmRideDto {
  @IsString({
    message:
      "O campo 'customer_id' precisa ser preenchido no formato 'Texto/String' ",
  })
  @IsNotEmpty({
    message: "O campo 'customer_id' precisa ser preenchido.",
  })
  customer_id: string;

  @IsString({
    message:
      "O campo 'origin' precisa ser preenchido no formato 'Texto/String' ",
  })
  @IsNotEmpty({
    message: "O campo 'origin' precisa ser preenchido.",
  })
  origin: string;

  @IsString({
    message:
      "O campo 'destination' precisa ser preenchido no formato 'Texto/String' ",
  })
  @IsNotEmpty({
    message: "O campo 'destination' precisa ser preenchido.",
  })
  destination: string;

  @IsNumber()
  @IsNotEmpty({
    message: "O campo 'distance' precisa ser preenchido.",
  })
  distance: number;

  @IsString({
    message:
      "O campo 'duration' precisa ser preenchido no formato 'Texto/String' ",
  })
  @IsNotEmpty({
    message: "O campo 'duration' precisa ser preenchido.",
  })
  duration: string;

  @ValidateNested()
  @Type(() => DriverDto)
  @IsNotEmpty({ message: "O campo 'driver' precisa ser preenchido." })
  driver: DriverDto;

  @IsNumber()
  @IsNotEmpty({
    message: "O campo 'value' precisa ser preenchido.",
  })
  value: number;
}
