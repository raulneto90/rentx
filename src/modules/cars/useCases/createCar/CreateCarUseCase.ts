import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: ICreateCarDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(
      data.licensePlate,
    );

    if (carExists) {
      throw new ErrorHandler('Car already exists');
    }

    const car = await this.carsRepository.create(data);

    return car;
  }
}
