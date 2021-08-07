import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, categoryId, name } = request.query;

    const listAvailablecarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const cars = await listAvailablecarsUseCase.execute({
      brand: brand as string,
      categoryId: categoryId as string,
      name: name as string,
    });

    return response.json(cars);
  }
}
