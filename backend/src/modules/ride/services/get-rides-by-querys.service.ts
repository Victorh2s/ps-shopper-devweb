import { HttpException, Injectable } from "@nestjs/common";
import {
  IGetRidesByQuerys,
  RideRepository,
} from "../interfaces/prisma-ride-repository";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";

@Injectable()
export class GetRidesByQuerysService {
  constructor(
    private driverRepository: DriverRepository,
    private rideRepository: RideRepository,
  ) {}

  async execute({ customer_id, driver_id }: IGetRidesByQuerys) {
    if (driver_id) {
      const driver = await this.driverRepository.getDriverById(driver_id);

      if (!driver) {
        throw new HttpException(
          {
            error_code: "INVALID_DRIVER",
            message: "Motorista inválido",
          },
          400,
        );
      }
    }

    const ridesByCustomerId = await this.rideRepository.getRidesByQuerys({
      customer_id,
      driver_id,
    });

    return ridesByCustomerId;
  }
}
