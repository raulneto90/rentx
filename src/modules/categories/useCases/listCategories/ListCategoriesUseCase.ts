import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/categories/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/categories/repositories/implementations/CategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject(CategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
