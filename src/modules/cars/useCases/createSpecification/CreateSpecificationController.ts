import { Request, Response } from "express";

import { CreateScpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(
    private createScpecificationUseCase: CreateScpecificationUseCase
  ) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    this.createScpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
