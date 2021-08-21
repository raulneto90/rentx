import { inject, injectable } from 'tsyringe';

import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}

  async execute(data: ICreateCarImagesDTO): Promise<CarImage> {}
}
