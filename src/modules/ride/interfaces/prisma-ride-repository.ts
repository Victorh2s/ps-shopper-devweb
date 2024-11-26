export interface ISaveRide {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  driver_id: number;
  user_id: string;
}

export interface ICreateRide {
  customer_id: string;
  data: ISaveRide;
}

export interface ICalculateRide {
  customer_id: string;
  destination: string;
  origin: string;
}

export interface IGetRidesByQuerys {
  customer_id: string;
  driver_id?: number;
}

export interface IConfirmRide {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export abstract class RideRepository {
  abstract createRide({ customer_id, data }: ICreateRide): Promise<void>;

  abstract getRidesByQuerys({
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
  }>;
}
