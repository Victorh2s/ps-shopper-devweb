import { HttpException } from "@nestjs/common";
import { CalculateRideService } from "../calculate-ride.service";
import { InMemoryDriverDatabase } from "src/shared/modules/database/in-memory/in-memory-driver.database";
import { axiosMaps } from "src/shared/utils/api/axios";

jest.mock("../../../../shared/utils/api/axios");

let inMemoryDriverDatabase: InMemoryDriverDatabase;
let sut: CalculateRideService;

describe("CalculateRideService", () => {
  beforeEach(async () => {
    inMemoryDriverDatabase = new InMemoryDriverDatabase();

    sut = new CalculateRideService(inMemoryDriverDatabase);
  });

  it("should throw an error if origin and destination are the same", async () => {
    await expect(
      sut.execute({
        customer_id: "251515125",
        origin: "same location",
        destination: "same location",
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

  it("should call the Google Maps API with the correct parameters", async () => {
    (axiosMaps.post as jest.Mock).mockResolvedValueOnce({
      data: {
        routes: [
          {
            legs: [
              {
                distance: { value: 10000 },
                duration: { text: "15 mins" },
                start_location: { lat: 1, lng: 1 },
                end_location: { lat: 2, lng: 2 },
              },
            ],
          },
        ],
      },
    });

    const result = await sut.execute({
      customer_id: "251515125",
      origin: "location A",
      destination: "location B",
    });

    expect(axiosMaps.post).toHaveBeenCalledWith(
      `/maps/api/directions/json?origin=location A&destination=location B&key=${process.env.GOOGLE_API_KEY}`,
    );
    expect(result.distance).toBe(10000);
  });

  it("should filter drivers by `min_trip_km`", async () => {
    await inMemoryDriverDatabase.createDriver({
      name: "McLovin A",
      description: "Test McLovin A",
      vehicle: "Car A",
      rating: 5,
      comment: "Great Driver",
      min_km_fee: 2.5,
      min_trip_km: 10,
    });

    await inMemoryDriverDatabase.createDriver({
      name: "McLovin B",
      description: "Test McLovin B",
      vehicle: "Car B",
      rating: 4,
      comment: "Good Driver",
      min_km_fee: 3,
      min_trip_km: 5,
    });

    (axiosMaps.post as jest.Mock).mockResolvedValueOnce({
      data: {
        routes: [
          {
            legs: [
              {
                distance: { value: 8000 },
                duration: { text: "10 mins" },
                start_location: { lat: 1, lng: 1 },
                end_location: { lat: 2, lng: 2 },
              },
            ],
          },
        ],
      },
    });

    const result = await sut.execute({
      customer_id: "251515125",
      origin: "location A",
      destination: "location B",
    });

    expect(result.options).toHaveLength(1);
    expect(result.options[0].name).toBe("McLovin B");
  });

  it("should calculate the total value for each driver correctly", async () => {
    await inMemoryDriverDatabase.createDriver({
      name: "McLovin C",
      description: "Test McLovin C",
      vehicle: "Car C",
      rating: 4.5,
      comment: "Amazing Driver",
      min_km_fee: 5,
      min_trip_km: 1,
    });

    (axiosMaps.post as jest.Mock).mockResolvedValueOnce({
      data: {
        routes: [
          {
            legs: [
              {
                distance: { value: 10000 },
                duration: { text: "15 mins" },
                start_location: { lat: 1, lng: 1 },
                end_location: { lat: 2, lng: 2 },
              },
            ],
          },
        ],
      },
    });

    const result = await sut.execute({
      customer_id: "251515125",
      origin: "location A",
      destination: "location B",
    });

    expect(result.options[0].value).toBe(50);
  });

  it("should return the formatted response with the correct options", async () => {
    await inMemoryDriverDatabase.createDriver({
      name: "McLovin D",
      description: "Test McLovin D",
      vehicle: "Car D",
      rating: 4,
      comment: "Great ride",
      min_km_fee: 4,
      min_trip_km: 2,
    });

    (axiosMaps.post as jest.Mock).mockResolvedValueOnce({
      data: {
        routes: [
          {
            legs: [
              {
                distance: { value: 2000 },
                duration: { text: "5 mins" },
                start_location: { lat: 1, lng: 1 },
                end_location: { lat: 2, lng: 2 },
              },
            ],
          },
        ],
      },
    });

    const result = await sut.execute({
      customer_id: "251515125",
      origin: "location A",
      destination: "location B",
    });

    expect(result.origin.latitude).toBe(1);
    expect(result.destination.longitude).toBe(2);
  });
});
