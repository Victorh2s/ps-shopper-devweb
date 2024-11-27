import { Injectable } from "@nestjs/common";
import {
  DriverRepository,
  ICreateDriver,
} from "../interfaces/prisma-driver-repository";

@Injectable()
export class CreateDriverService {
  constructor(private driverRepository: DriverRepository) {}

  async execute(data: ICreateDriver) {
    await this.driverRepository.createDriver(data);
  }
}
