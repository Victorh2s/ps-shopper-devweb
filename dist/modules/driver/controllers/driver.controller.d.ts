import { DriverService } from "../services/driver.service";
import { CreateDriverDto } from "../dtos/create-driver.dto";
export declare class DriverController {
  private readonly driverService;
  constructor(driverService: DriverService);
  createDriver({
    name,
    description,
    vehicle,
    comment,
    rating,
    min_km_fee,
    min_trip_km,
  }: CreateDriverDto): Promise<{
    message: string;
  }>;
}
