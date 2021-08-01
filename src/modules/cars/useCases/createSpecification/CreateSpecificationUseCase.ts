import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(data: ICreateSpecificationDTO): Promise<Specification> {
    const specificationExists = await this.specificationsRepository.findByName(
      data.name,
    );

    if (specificationExists) {
      throw new ErrorHandler('Specification already exists');
    }

    const specification = await this.specificationsRepository.create(data);

    return specification;
  }
}
