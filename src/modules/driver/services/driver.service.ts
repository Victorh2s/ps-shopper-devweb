import { Injectable } from "@nestjs/common";
import {
  DriverRepository,
  ICreateDriver,
} from "../interfaces/prisma-driver-repository";

@Injectable()
export class DriverService {
  constructor(private driverRepository: DriverRepository) {}

  async createDriver(data: ICreateDriver) {
    await this.driverRepository.createDriver(data);
  }
}
