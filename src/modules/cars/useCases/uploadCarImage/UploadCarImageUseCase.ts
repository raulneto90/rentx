import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

export class UploadCarImageUseCase {
  async execute(data: ICreateCarImagesDTO): Promise<CarImage> {}
}
