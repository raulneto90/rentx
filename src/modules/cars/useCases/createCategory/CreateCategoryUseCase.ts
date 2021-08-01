import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
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
