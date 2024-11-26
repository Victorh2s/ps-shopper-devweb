import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  ICreateRide,
  IGetRidesByQuerys,
  RideRepository,
} from "src/modules/ride/interfaces/prisma-ride-repository";

@Injectable()
export class PrismaRideDatabase implements RideRepository {
  constructor(private prisma: PrismaService) {}

  async createRide({ customer_id, data }: ICreateRide) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        customer_id,
      },
    });
    if (!findUser) {
      await this.prisma.user.create({
        data: {
          customer_id,
        },
      });
    }

    await this.prisma.rides.create({ data });
    return;
  }

  async getRidesByQuerys({ customer_id, driver_id }: IGetRidesByQuerys) {
    const userId = await this.prisma.user.findUnique({
      where: {
        customer_id,
      },
      select: {
        customer_id: true,
        rides: {
          select: {
            id: true,
            createdAt: true,
            origin: true,
            destination: true,
            distance: true,
            duration: true,
            driver: {
              select: {
                id: true,
                name: true,
              },
            },
            value: true,
          },
          where: driver_id ? { driver_id: +driver_id } : undefined,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!userId)
      throw new HttpException(
        {
          error_code: "USER_NOT_FOUND",
          message: "Usuário não foi encontrado com base no customer_id passado",
        },
        404,
      );

    const formattedResponse = {
      customer_id: userId.customer_id,
      rides: userId.rides.map((ride) => ({
        id: ride.id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
        },
        value: ride.value,
      })),
    };

    return formattedResponse;
  }
}
