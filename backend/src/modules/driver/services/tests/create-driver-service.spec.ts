import { InMemoryDriverDatabase } from "src/shared/modules/database/in-memory/in-memory-driver.database";
import { CreateDriverService } from "../create-driver.service";

jest.mock("src/shared/modules/database/in-memory/in-memory-driver.database");

let inMemoryDriverDatabase: InMemoryDriverDatabase;
let sut: CreateDriverService;

describe("CreateDriverService", () => {
  beforeEach(() => {
    inMemoryDriverDatabase = new InMemoryDriverDatabase();
    sut = new CreateDriverService(inMemoryDriverDatabase);

    inMemoryDriverDatabase.createDriver = jest
      .fn()
      .mockResolvedValue(undefined);

    inMemoryDriverDatabase.getDriverById = jest.fn().mockResolvedValue({
      id: 1,
      name: "McLovin",
      description:
        "Olá gatinhas! Prazer, McLovin o rei da sedução. Entre no carro, aperte o cinto e cuidado para não se apaixonar pelo garanhão aqui s2",
      vehicle: "Astra 2.0 de leilão, cheio de multa e rebaixado.",
      rating: 5,
      comment:
        "Piloto extremamente sensual e atraente, fiquei bem à vontade com ele no carro rs...",
      min_km_fee: 50.0,
      min_trip_km: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  });

  it("should create new driver", async () => {
    const driverData = {
      name: "McLovin",
      description:
        "Olá gatinhas! Prazer, McLovin o rei da sedução. Entre no carro, aperte o cinto e cuidado para não se apaixonar pelo garanhão aqui s2",
      vehicle: "Astra 2.0 de leilão, cheio de multa e rebaixado.",
      rating: 5,
      comment:
        "Piloto extremamente sensual e atraente, fiquei bem à vontade com ele no carro rs...",
      min_km_fee: 50.0,
      min_trip_km: 25,
    };

    await sut.execute(driverData);

    const findDriver = await inMemoryDriverDatabase.getDriverById(1);

    expect(findDriver.id).toEqual(1);
    expect(findDriver.name).toEqual(driverData.name);
    expect(findDriver.vehicle).toEqual(driverData.vehicle);
  });
});
