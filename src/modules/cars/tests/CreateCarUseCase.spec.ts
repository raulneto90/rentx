import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { FakeCarsRepository } from '../repositories/fakes/FakeCarsRepository';
import { CreateCarUseCase } from '../useCases/createCar/CreateCarUseCase';

describe('CreateCarUseCase', () => {
  let fakeCarsRepository: FakeCarsRepository;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(async () => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123',
      dailyRate: 150,
      description: 'Car description test',
      fineAmount: 60,
      licensePlate: '123XZZ',
      name: 'Car test',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with same license plate', async () => {
    await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123',
      dailyRate: 150,
      description: 'Car description test',
      fineAmount: 60,
      licensePlate: '123XZZ',
      name: 'Car test',
    });

    await expect(
      createCarUseCase.execute({
        brand: 'Brand test',
        categoryId: '123',
        dailyRate: 150,
        description: 'Car description test',
        fineAmount: 60,
        licensePlate: '123XZZ',
        name: 'Car test 2',
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should be able to create an available car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123',
      dailyRate: 150,
      description: 'Car description test',
      fineAmount: 60,
      licensePlate: '123XZZ',
      name: 'Car test',
    });

    expect(car).toHaveProperty('available');
    expect(car.available).toBe(true);
  });
});
