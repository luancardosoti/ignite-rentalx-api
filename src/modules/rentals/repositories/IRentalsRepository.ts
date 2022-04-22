import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentByCar(car_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
