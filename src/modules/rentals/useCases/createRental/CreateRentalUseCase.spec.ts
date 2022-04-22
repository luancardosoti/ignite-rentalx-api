import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

let dayAdd24Hours: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );

    dayAdd24Hours = dayjsDateProvider.addHours(dayjsDateProvider.dateNow(), 24);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "car",
      user_id: "user",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car1",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "car2",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123",
        user_id: "user1",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "123",
        user_id: "user2",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const dateNow = dayjsDateProvider.dateNow();
      await createRentalUseCase.execute({
        car_id: "123",
        user_id: "user1",
        expected_return_date: dayjsDateProvider.addHours(dateNow, 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
