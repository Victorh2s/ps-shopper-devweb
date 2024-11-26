import { IsNotEmpty, IsString } from "class-validator";

export class GetRidesParamDto {
  @IsString({ message: "O campo 'customer_id' precisa ser um texto." })
  @IsNotEmpty({ message: "O campo 'customer_id' é obrigatório." })
  customer_id: string;
}
