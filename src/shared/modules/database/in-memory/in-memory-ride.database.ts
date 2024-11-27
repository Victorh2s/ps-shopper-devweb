import {
  RideRepository,
  ICreateRide,
  IGetRidesByQuerys,
} from "src/modules/ride/interfaces/prisma-ride-repository";

export class InMemoryRideDatabase implements RideRepository {
  private rides: Array<{
    id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver_id: number;
    user_id: string;
    createdAt: Date;
  }> = [];

  private users: Array<{
    customer_id: string;
  }> = [];

  private currentId = 1;

  async createRide({ customer_id, data }: ICreateRide): Promise<void> {
    const userExists = this.users.some(
      (user) => user.customer_id === customer_id,
    );
    if (!userExists) {
      this.users.push({ customer_id });
    }

    this.rides.push({
      id: this.currentId++,
      ...data,
      user_id: customer_id,
      createdAt: new Date(),
    });
  }

  async getRidesByQuerys({
    customer_id,
    driver_id,
  }: IGetRidesByQuerys): Promise<{
    customer_id: string;
    rides: {
      id: number;
      date: Date;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driver: {
        id: number;
        name: string;
      };
      value: number;
    }[];
  }> {
    const rides = this.rides
      .filter(
        (ride) =>
          ride.user_id === customer_id &&
          (!driver_id || ride.driver_id === driver_id),
      )
      .map((ride) => ({
        id: ride.id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver_id,
          name: `Drive`,
        },
        value: ride.value,
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return {
      customer_id,
      rides,
    };
  }
}
