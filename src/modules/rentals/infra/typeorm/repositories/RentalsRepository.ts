import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.');
  }
  findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.');
  }
}
