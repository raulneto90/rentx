import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { Category } from '@modules/categories/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(data);

    await this.repository.save(category);

    return category;
  }

  findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}
