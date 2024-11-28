import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DriverDto {
  @IsNumber({}, { message: "O campo 'id' precisa ser preenchido como número." })
  @IsNotEmpty({ message: "O campo 'id' precisa ser preenchido." })
  id: number;

  @IsString({
    message: "O campo 'name' precisa ser preenchido no formato 'Texto/String'.",
  })
  @IsNotEmpty({ message: "O campo 'name' precisa ser preenchido." })
  name: string;
}
