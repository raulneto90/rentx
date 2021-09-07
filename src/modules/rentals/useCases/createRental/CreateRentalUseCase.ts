import { inject, injectable } from 'tsyringe';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/models/IDateProvider';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumReturnHour = 24;

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

    const currentDate = this.dateProvider.currentDate();

    const compareDate = this.dateProvider.compareDateInHours(
      currentDate,
      expectedReturnDate,
    );

    if (compareDate < minimumReturnHour) {
      throw new ErrorHandler(
        'Return date of rental must have at least 24 hours',
      );
    }

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return rental;
  }
}
