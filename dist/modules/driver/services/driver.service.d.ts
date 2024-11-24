import {
  DriverRepository,
  ICreateDriver,
} from "../interfaces/prisma-driver-repository";
export declare class DriverService {
  private driverRepository;
  constructor(driverRepository: DriverRepository);
  createDriver(data: ICreateDriver): Promise<void>;
}
