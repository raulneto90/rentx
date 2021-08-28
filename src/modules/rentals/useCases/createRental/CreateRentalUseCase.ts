import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

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
  }: IRequest): Promise<void> {
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
  }
}
