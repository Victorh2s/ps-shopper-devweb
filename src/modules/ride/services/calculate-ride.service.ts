import { HttpException, Injectable } from "@nestjs/common";
import { ICalculateRide } from "../interfaces/prisma-ride-repository";
import { DriverRepository } from "src/modules/driver/interfaces/prisma-driver-repository";
import { axiosMaps } from "src/shared/utils/api/axios";

@Injectable()
export class CalculateRideService {
  constructor(private driverRepository: DriverRepository) {}

  async execute({ destination, origin }: ICalculateRide) {
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
}
