import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateScpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specificarion already exists!");
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateScpecificationService };
