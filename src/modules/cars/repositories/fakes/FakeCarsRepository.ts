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

  async findAllAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter(
      car =>
        car.available === true ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name),
    );
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async update(car: Car): Promise<Car> {
    const carIndex = this.cars.findIndex(
      existentCar => existentCar.id === car.id,
    );

    this.cars[carIndex] = car;

    return car;
  }
}
