import { IsNotEmpty, IsString } from "class-validator";

export class CalculateRideDto {
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
}
