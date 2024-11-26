import { HttpException, Injectable } from "@nestjs/common";
import {
  ICalculateRide,
  IConfirmRide,
  IGetRidesByQuerys,
  RideRepository,
} from "../interfaces/prisma-ride-repository";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";
import { axiosMaps } from "src/shared/utils/api/axios";
import { mockDrivers } from "src/modules/driver/mock/drivers";

@Injectable()
export class RideService {
  constructor(
    private driverRepository: DriverRepository,
    private rideRepository: RideRepository,
  ) {}

  async calculateRide({ destination, origin }: ICalculateRide) {
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

    const { data } = await axiosMaps.post(
      `/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`,
    );

    const distanceInKm = data.routes[0].legs[0].distance.value / 1000;

    const drivers = await this.driverRepository.getDrivers();

    const filterDriverForKm = drivers.filter(
      (driver) => distanceInKm > driver.min_trip_km,
    );

    const driversFormat = filterDriverForKm.map((driver) => {
      const totalValue = driver.min_km_fee * distanceInKm;
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.Review[0].rating,
          comment: driver.Review[0].comment,
        },
        value: +totalValue.toFixed(2),
      };
    });

    const response = {
      origin: {
        latitude: data.routes[0].legs[0].start_location.lat,
        longitude: data.routes[0].legs[0].start_location.lng,
      },
      destination: {
        latitude: data.routes[0].legs[0].end_location.lat,
        longitude: data.routes[0].legs[0].end_location.lng,
      },
      distance: data.routes[0].legs[0].distance.value,
      duration: data.routes[0].legs[0].duration.text,
      options: driversFormat,
      routeResponse: data,
    };

    return response;
  }

  async confirmRide({
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

    const findDriver = mockDrivers.find((item) => item.id === driver.id);

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

  async getRidesByCustomerId({ customer_id, driver_id }: IGetRidesByQuerys) {
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
