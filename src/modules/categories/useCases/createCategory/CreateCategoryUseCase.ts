import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { Category } from '@modules/categories/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/categories/repositories/implementations/CategoriesRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject(CategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: ICreateCategoryDTO): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(
      data.name,
    );

    if (categoryExists) {
      throw new ErrorHandler('Category already exists');
    }

    const category = await this.categoriesRepository.create(data);

    return category;
  }
}
