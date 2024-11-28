import { HttpException } from "@nestjs/common";
import { GetRidesByQuerysService } from "../get-rides-by-querys.service";
import { InMemoryDriverDatabase } from "src/shared/modules/database/in-memory/in-memory-driver.database";
import { InMemoryRideDatabase } from "src/shared/modules/database/in-memory/in-memory-ride.database";

jest.mock("src/shared/modules/database/in-memory/in-memory-driver.database");

let inMemoryDriverDatabase: InMemoryDriverDatabase;
let inMemoryRideDatabase: InMemoryRideDatabase;
let sut: GetRidesByQuerysService;

describe("GetRidesByQuerysService", () => {
  beforeEach(() => {
    inMemoryDriverDatabase = new InMemoryDriverDatabase();
    inMemoryRideDatabase = new InMemoryRideDatabase();
    sut = new GetRidesByQuerysService(
      inMemoryDriverDatabase,
      inMemoryRideDatabase,
    );
  });

  it("should throw an error if the driver is invalid", async () => {
    inMemoryDriverDatabase.getDriverById = jest.fn().mockResolvedValue(null);

    await expect(
      sut.execute({
        customer_id: "12345",
        driver_id: 1,
      }),
    ).rejects.toThrow(
      new HttpException(
        {
          error_code: "INVALID_DRIVER",
          message: "Motorista inválido",
        },
        400,
      ),
    );
  });

  it("should return rides for a valid customer without a driver filter", async () => {
    inMemoryDriverDatabase.createDriver({
      name: "McLovin",
      description:
        "Olá gatinhas! Prazer, McLovin o rei da sedução. Entre no carro, aperte o cinto e cuidado para não se apaixonar pelo garanhão aqui s2",
      vehicle: "Astra 2.0 de leilão, cheio de multa e rebaixado.",
      rating: 5,
      comment:
        "Piloto extremamente sensual e atraente, fiquei bem à vontade com ele no carro rs...",
      min_km_fee: 50.0,
      min_trip_km: 25,
    });
    inMemoryDriverDatabase.createDriver({
      name: "McLovin2",
      description:
        "Olá gatinhas! Prazer, McLovin o rei da sedução. Entre no carro, aperte o cinto e cuidado para não se apaixonar pelo garanhão aqui s2",
      vehicle: "Astra 2.0 de leilão, cheio de multa e rebaixado.",
      rating: 5,
      comment:
        "Piloto extremamente sensual e atraente, fiquei bem à vontade com ele no carro rs...",
      min_km_fee: 50.0,
      min_trip_km: 25,
    });

    const rideData1 = {
      user_id: "123456",
      driver_id: 1,
      origin:
        "Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP, 04696-000",
      destination:
        "Autódromo José Carlos Pace, Av. Sen. Teotônio Vilela, 261 - Interlagos, São Paulo - SP, 04801-010",
      distance: 5730,
      duration: "14 mins",
      driver: {
        id: 2,
        name: "Dominic Toretto",
      },
      value: 14.33,
    };

    const rideData2 = {
      user_id: "123456",
      driver_id: 2,
      origin:
        "Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP, 04696-000",
      destination:
        "Autódromo José Carlos Pace, Av. Sen. Teotônio Vilela, 261 - Interlagos, São Paulo - SP, 04801-010",
      distance: 5730,
      duration: "14 mins",
      driver: {
        id: 2,
        name: "Dominic Toretto",
      },
      value: 14.33,
    };

    inMemoryRideDatabase.createRide({ customer_id: "123456", data: rideData1 });
    inMemoryRideDatabase.createRide({
      customer_id: "123456",
      data: rideData2,
    });

    const result = await sut.execute({
      customer_id: "123456",
      driver_id: undefined,
    });

    expect(result.customer_id).toEqual("123456");
    expect(result.rides.length).toEqual(2);
  });
});
