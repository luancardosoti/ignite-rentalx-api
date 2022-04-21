import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "@modules/cars/dtos/IFindAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (brand) carsQuery.andWhere("brand = :brand", { brand });

    if (name) carsQuery.andWhere("name = :name", { name });

    if (category_id)
      carsQuery.andWhere("category_id = :category_id", { category_id });

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
