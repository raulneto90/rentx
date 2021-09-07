import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

dayjs.extend(utc);
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

    const dateNow = dayjs().utc().local().format();
    const expectedReturnDateUtc = dayjs(expectedReturnDate)
      .utc()
      .local()
      .format();
    const compareDate = dayjs(expectedReturnDateUtc).diff(dateNow, 'hours');

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
