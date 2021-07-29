import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { FakeSpecificationsRepository } from '../repositories/fakes/FakeSpecificationsRepository';
import { CreateSpecificationUseCase } from '../useCases/createSpecification/CreateSpecificationUseCase';

describe('CreateSpecificationUseCase', () => {
  let createSpecificationUseCase: CreateSpecificationUseCase;
  let fakeSpecificationsRepository: FakeSpecificationsRepository;

  const data: ICreateSpecificationDTO = {
    name: 'Specification test',
    description: 'Description for specification test',
  };

  beforeEach(async () => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      fakeSpecificationsRepository,
    );
  });

  it('should be able to create a new specification', async () => {
    const specification = await createSpecificationUseCase.execute(data);

    expect(specification).toHaveProperty('id');
    expect(specification).toHaveProperty('name');
    expect(specification).toHaveProperty('description');
    expect(specification).toHaveProperty('createdAt');
    expect(specification).toHaveProperty('updatedAt');
    expect(specification.name).toBe(data.name);
    expect(specification.description).toBe(data.description);
  });

  it('should not be able to create an existent specification', async () => {
    await createSpecificationUseCase.execute(data);

    await expect(
      createSpecificationUseCase.execute(data),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });
});
