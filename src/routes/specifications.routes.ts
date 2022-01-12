import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateScpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateScpecificationService(
    specificationRepository
  );

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };
