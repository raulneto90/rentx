import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarImagesRepository } from '../ICarImagesRepository';

export class FakeCarImagesRepository implements ICarImagesRepository {
  private carImages: CarImage[];

  constructor() {
    this.carImages = [];
  }

  async create(data: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, data, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.carImages.push(carImage);

    return carImage;
  }
}
