import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "../dtos/IFindAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data: IFindAvailableCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
