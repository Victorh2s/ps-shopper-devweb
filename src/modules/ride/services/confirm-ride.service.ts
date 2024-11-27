import { HttpException, Injectable } from "@nestjs/common";
import {
  IConfirmRide,
  RideRepository,
} from "../interfaces/prisma-ride-repository";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";

@Injectable()
export class ConfirmRideService {
  constructor(
    private driverRepository: DriverRepository,
    private rideRepository: RideRepository,
  ) {}

  async execute({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: IConfirmRide) {
    if (origin === destination) {
      throw new HttpException(
        {
          error_code: "INVALID_DATA",
          message:
            "Os endereços de origem e destino não podem ser o mesmo endereço",
        },
        400,
      );
    }

    const findDriver = await this.driverRepository.getDriverById(driver.id);

    if (!findDriver) {
      throw new HttpException(
        {
          error_code: "DRIVER_NOT_FOUND",
          message: "Motorista não encontrado",
        },
        404,
      );
    }

    const distanceInKm = distance / 1000;
    console.log(findDriver.min_km_fee);
    console.log(distanceInKm);

    if (findDriver.min_trip_km > distanceInKm) {
      throw new HttpException(
        {
          error_code: "INVALID_DISTANCE",
          message: "Quilometragem inválida para o motorista",
        },
        406,
      );
    }

    const data = {
      user_id: customer_id,
      origin,
      destination,
      distance,
      duration,
      driver_id: driver.id,
      value,
    };

    await this.rideRepository.createRide({ customer_id, data });

    return {
      success: true,
    };
  }
}
