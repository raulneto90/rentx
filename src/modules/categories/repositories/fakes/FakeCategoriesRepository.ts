import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { Category } from '@modules/categories/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, data, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }
}
