import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }

  async findAllAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    const query = await this.repository
      .createQueryBuilder('cars')
      .where('cars.available = :available', { available: true });

    if (brand) {
      query.andWhere('cars.brand = :brand', { brand });
    }

    if (categoryId) {
      query.andWhere('cars.category_id = :categoryId', { categoryId });
    }

    if (name) {
      query.andWhere('cars.name = :name', { name });
    }

    const cars = await query.getMany();

    return cars;
  }
}
