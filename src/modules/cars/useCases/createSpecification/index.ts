import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateScpecificationUseCase } from "./CreateSpecificationUseCase";

const secificationsRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateScpecificationUseCase(
  secificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
