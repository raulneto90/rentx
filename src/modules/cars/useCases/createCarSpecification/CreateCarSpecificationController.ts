import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specificationsId } = request.body;
    const { id } = request.params;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const car = await createCarSpecificationUseCase.execute({
      carId: id,
      specificationsId,
    });

    return response.status(201).json(car);
  }
}
