export interface ICreateDriver {
  name: string;
  description: string;
  car: string;
  rating: string;
  min_km_fee: number;
  min_trip_km: number;
}
export declare abstract class DriverRepository {
  abstract createDriver(data: ICreateDriver): Promise<void>;
}
