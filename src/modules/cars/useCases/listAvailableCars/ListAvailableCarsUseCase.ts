import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  categoryId?: string;
  name?: string;
  brand?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable(
      brand,
      categoryId,
      name,
    );

    return cars;
  }
}
