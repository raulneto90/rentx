import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { Category } from '@modules/categories/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

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
