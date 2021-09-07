import { inject, injectable } from 'tsyringe';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId,
    );

    if (carUnavailable) {
      throw new ErrorHandler(`There's a rental in progress for this car!`);
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId,
    );

    if (rentalOpenToUser) {
      throw new ErrorHandler(`There's a rental in progress for this user!`);
    }

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return rental;
  }
}
