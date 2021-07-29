import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description }: ICreateSpecificationDTO = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    );

    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}
