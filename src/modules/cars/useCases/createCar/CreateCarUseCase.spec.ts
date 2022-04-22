import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUserCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUserCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUserCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car wiith exists license plate", async () => {
    expect(async () => {
      const license_plate = "ABC-1234";
      await createCarUserCase.execute({
        name: "Car 1",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate,
        fine_amount: 10,
        brand: "VW",
        category_id: " 1",
      });

      await createCarUserCase.execute({
        name: "Car 2",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate,
        fine_amount: 10,
        brand: "VW",
        category_id: "1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default ", async () => {
    const car = await createCarUserCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    expect(car.available).toBe(true);
  });
});
