import { inject, injectable } from "tsyringe";

import { IFindAvailableCarsDTO } from "@modules/cars/dtos/IFindAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    category_id,
    brand,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      category_id,
      brand,
      name,
    });
    return cars;
  }
}

export { ListAvailableCarsUseCase };
