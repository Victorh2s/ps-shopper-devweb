export interface ISaveRide {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  driver_id: number;
}

export interface ICalculateRide {
  customer_id: string;
  destination: string;
  origin: string;
}

export interface IGetRidesByQuerys {
  customer_id: string;
  driver_id: number;
}

export abstract class RideRepository {
  abstract createRide(data: ISaveRide): Promise<void>;

  abstract getRidesByQuerys({
    customer_id,
    driver_id,
  }: IGetRidesByQuerys): Promise<
    ({
      driver: {
        id: number;
        name: string;
      };
    } & {
      customer_id: string;
      driver_id: number;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      value: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    })[]
  >;
}
