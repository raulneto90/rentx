import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(data);

    await this.repository.save(specification);

    return specification;
  }

  findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }
}
