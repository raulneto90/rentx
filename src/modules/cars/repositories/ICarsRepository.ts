import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findAllAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  update(car: Car): Promise<Car>;
}
