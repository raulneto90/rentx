import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
}
