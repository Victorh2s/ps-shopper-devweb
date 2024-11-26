export declare const mockDrivers: (
  | {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      min_km_fee: number;
      min_trip_km: number;
      rating: number;
      comment: string;
    }
  | {
      name: string;
      description: string;
      vehicle: string;
      min_km_fee: number;
      min_trip_km: number;
      rating: number;
      comment: string;
      id?: undefined;
    }
)[];
