import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.carId === carId && !rental.endDate,
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.userId === userId && !rental.endDate,
    );
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, data, {
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.rentals.push(rental);

    return rental;
  }
}
