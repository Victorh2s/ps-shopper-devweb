export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface ISaveRide {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  driver_id: number;
}

export interface IGetRidesByQuerys {
  customer_id: number;
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
      customer_id: number;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      value: number;
      driver_id: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    })[]
  >;
}
