import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecificationDTO } from '@modules/cars/dtos/ICreateCarSpecificationDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    carId,
    specificationsId,
  }: ICreateCarSpecificationDTO): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new ErrorHandler('Car does not exists', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId,
    );

    car.specifications = specifications;

    await this.carsRepository.update(car);

    return car;
  }
}
