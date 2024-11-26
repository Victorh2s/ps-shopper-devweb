import { DriverDto } from "./driver-ride.dto";
export declare class ConfirmRideDto {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: DriverDto;
  value: number;
}
