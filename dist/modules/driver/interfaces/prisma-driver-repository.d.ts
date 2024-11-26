export interface ICreateDriver {
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  min_km_fee: number;
  min_trip_km: number;
}
export declare abstract class DriverRepository {
  abstract createDriver({
    name,
    description,
    vehicle,
    rating,
    comment,
    min_km_fee,
    min_trip_km,
  }: ICreateDriver): Promise<void>;
  abstract getDrivers(): Promise<
    ({
      Review: {
        id: number;
        rating: number;
        comment: string;
        driver_id: number;
      }[];
    } & {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      min_km_fee: number;
      min_trip_km: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    })[]
  >;
  abstract getDriverById(driver_id: number): Promise<{
    name: string;
    id: number;
    description: string;
    vehicle: string;
    min_km_fee: number;
    min_trip_km: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>;
}
