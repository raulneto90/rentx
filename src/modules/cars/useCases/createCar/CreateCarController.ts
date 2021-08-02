import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      name,
      licensePlate,
    }: ICreateCarDTO = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      name,
      licensePlate,
    });

    return response.status(201).json(car);
  }
}
