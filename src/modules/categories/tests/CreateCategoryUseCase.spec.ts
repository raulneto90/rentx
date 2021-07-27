import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { FakeCategoriesRepository } from '../repositories/fakes/FakeCategoriesRepository';
import { CreateCategoryUseCase } from '../useCases/createCategory/CreateCategoryUseCase';
import { ListCategoriesUseCase } from '../useCases/listCategories/ListCategoriesUseCase';

describe('CreateCategoryUseCase', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let listCategoriesUseCase: ListCategoriesUseCase;
  let fakeCategoriesRepository: FakeCategoriesRepository;

  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
    listCategoriesUseCase = new ListCategoriesUseCase(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category Test description',
    });

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
    expect(category).toHaveProperty('createdAt');
    expect(category).toHaveProperty('updatedAt');
  });

  it('should not be able to create an existent category', async () => {
    await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category Test description',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Category Test',
        description: 'Category Test description',
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should be able to list all categories', async () => {
    await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category Test description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect.arrayContaining(categories);
  });
});
