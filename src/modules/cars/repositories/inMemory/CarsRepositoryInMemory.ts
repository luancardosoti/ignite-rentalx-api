import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "@modules/cars/dtos/IFindAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    category_id,
    brand,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const allCarsAvailables = this.cars
      .filter((car) => car.available === true)
      .filter(
        (car) =>
          (!brand && !category_id && !name) ||
          (brand && car.brand.toLowerCase() === brand.toLowerCase()) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name.toLowerCase() === name.toLowerCase())
      );

    return allCarsAvailables;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
