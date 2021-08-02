import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class FakeCarsRepository implements ICarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data, {
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }
}
