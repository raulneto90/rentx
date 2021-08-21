import { ICreateCarImagesDTO } from '../dtos/ICreateCarImageDTO';
import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarImagesRepository {
  create(data: ICreateCarImagesDTO): Promise<CarImage>;
}
