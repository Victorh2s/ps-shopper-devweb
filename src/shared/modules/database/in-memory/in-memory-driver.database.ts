import { Injectable } from "@nestjs/common";
import {
  DriverRepository,
  ICreateDriver,
} from "src/modules/driver/interfaces/prisma-driver-repository";

@Injectable()
export class InMemoryDriverDatabase implements DriverRepository {
  public items: Array<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    min_km_fee: number;
    min_trip_km: number;
    Review: {
      id: number;
      rating: number;
      comment: string;
    }[];
    Rides: {
      id: number;
      user_id: string;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      value: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    }[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }> = [];

  private currentId = 1;

  async createDriver({
    name,
    description,
    vehicle,
    rating,
    comment,
    min_km_fee,
    min_trip_km,
  }: ICreateDriver): Promise<void> {
    const newDriver = {
      id: this.currentId++,
      name,
      description,
      vehicle,
      min_km_fee,
      min_trip_km,
      Review: [
        {
          id: this.currentId++,
          rating,
          comment,
        },
      ],
      Rides: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    this.items.push(newDriver);
  }

  async getDrivers() {
    return this.items.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      min_km_fee: driver.min_km_fee,
      min_trip_km: driver.min_trip_km,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
      deletedAt: driver.deletedAt ?? new Date(0),
      Review: driver.Review.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        driver_id: driver.id,
      })),
    }));
  }

  async getDriverById(driver_id: number) {
    const driver = this.items.find((item) => item.id === driver_id);

    return {
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      min_km_fee: driver.min_km_fee,
      min_trip_km: driver.min_trip_km,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
      deletedAt: driver.deletedAt ?? new Date(0),
    };
  }
}
