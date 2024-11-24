import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateDriverDto {
  @IsString({ message: "Esse campo precisar preenchido como uma 'String'" })
  @IsNotEmpty({
    message: "O nome do motorista precisa ser preenchido.",
  })
  @MaxLength(35, {
    message: "O nome do motorista deve ter até 35 caracteres",
  })
  name: string;

  @IsString({ message: "Esse campo precisar preenchido como uma 'String'" })
  @MaxLength(250, {
    message: "O descrição do motorista deve ter até 250 caracteres",
  })
  description: string;

  @IsString({ message: "Esse campo precisar preenchido como uma 'String'" })
  @MaxLength(150, {
    message: "O descrição do carro deve ter até 150 caracteres",
  })
  car: string;

  @IsString({ message: "Esse campo precisar preenchido como uma 'String'" })
  rating: string;

  @IsNumber()
  @IsNotEmpty({
    message:
      "O campo de Taxa mínima por quilômetro do motorista precisa ser preenchido.",
  })
  min_km_fee: number;

  @IsNumber()
  @IsNotEmpty({
    message:
      "O campo de quilometragem minima do motorista precisa ser preenchido.",
  })
  min_trip_km: number;
}
