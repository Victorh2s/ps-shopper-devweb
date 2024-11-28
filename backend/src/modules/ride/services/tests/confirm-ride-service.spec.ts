import { HttpException } from "@nestjs/common";
import { ConfirmRideService } from "../confirm-ride.service";
import { InMemoryDriverDatabase } from "src/shared/modules/database/in-memory/in-memory-driver.database";
import { InMemoryRideDatabase } from "src/shared/modules/database/in-memory/in-memory-ride.database";

let inMemoryDriverDatabase: InMemoryDriverDatabase;
let inMemoryRideDatabase: InMemoryRideDatabase;
let sut: ConfirmRideService;

describe("ConfirmRideService", () => {
  beforeEach(() => {
    inMemoryDriverDatabase = new InMemoryDriverDatabase();
    inMemoryRideDatabase = new InMemoryRideDatabase();
    sut = new ConfirmRideService(inMemoryDriverDatabase, inMemoryRideDatabase);
  });

  it("should throw an error if origin and destination are the same", async () => {
    await expect(
      sut.execute({
        customer_id: "12345",
        origin: "same location",
        destination: "same location",
        distance: 10000,
        duration: "10 mins",
        driver: { id: 1, name: "McLovin" },
        value: 50,
      }),
    ).rejects.toThrow(
      new HttpException(
        {
          error_code: "INVALID_DATA",
          message:
            "Os endereços de origem e destino não podem ser o mesmo endereço",
        },
        400,
      ),
    );
  });

  it("should throw an error if the driver is not found", async () => {
    inMemoryDriverDatabase.getDriverById = jest.fn().mockResolvedValue(null);
    await expect(
      sut.execute({
        customer_id: "12345",
        origin: "location A",
        destination: "location B",
        distance: 10000,
        duration: "10 mins",
        driver: { id: 1, name: "McLovin" },
        value: 50,
      }),
    ).rejects.toThrow(
      new HttpException(
        {
          error_code: "DRIVER_NOT_FOUND",
          message: "Motorista não encontrado",
        },
        404,
      ),
    );
  });

  it("should throw an error if the distance is invalid for the driver", async () => {
    inMemoryDriverDatabase.getDriverById = jest.fn().mockResolvedValue({
      min_trip_km: 10,
    });

    await expect(
      sut.execute({
        customer_id: "12345",
        origin: "location A",
        destination: "location B",
        distance: 5000,
        duration: "10 mins",
        driver: { id: 1, name: "McLovin" },
        value: 50,
      }),
    ).rejects.toThrow(
      new HttpException(
        {
          error_code: "INVALID_DISTANCE",
          message: "Quilometragem inválida para o motorista",
        },
        406,
      ),
    );
  });

  it("should create a ride if the input is valid", async () => {
    inMemoryDriverDatabase.getDriverById = jest.fn().mockResolvedValue({
      min_trip_km: 1,
    });

    inMemoryRideDatabase.createRide = jest.fn().mockResolvedValue(true);

    const result = await sut.execute({
      customer_id: "12345",
      origin: "location A",
      destination: "location B",
      distance: 10000,
      duration: "10 mins",
      driver: { id: 1, name: "McLovin" },
      value: 50,
    });

    expect(result).toEqual({ success: true });
    expect(inMemoryRideDatabase.createRide).toHaveBeenCalledWith({
      customer_id: "12345",
      data: {
        user_id: "12345",
        origin: "location A",
        destination: "location B",
        distance: 10000,
        duration: "10 mins",
        driver_id: 1,
        value: 50,
      },
    });
  });
});
