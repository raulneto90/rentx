import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { FakeCarsRepository } from '../repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '../repositories/fakes/FakeSpecificationsRepository';
import { CreateCarUseCase } from '../useCases/createCar/CreateCarUseCase';
import { CreateCarSpecificationUseCase } from '../useCases/createCarSpecification/CreateCarSpecificationUseCase';
import { CreateSpecificationUseCase } from '../useCases/createSpecification/CreateSpecificationUseCase';

let createCarUseCase: CreateCarUseCase;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createSpecificationUseCase: CreateSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('Create car specification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarsRepository,
      fakeSpecificationsRepository,
    );
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);

    createSpecificationUseCase = new CreateSpecificationUseCase(
      fakeSpecificationsRepository,
    );
  });

  it('should be able to add a new car specification', async () => {
    const specification = await createSpecificationUseCase.execute({
      name: '4 rodas',
      description: '4 rodas',
    });

    const specificationsId = [specification.id];

    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123',
      dailyRate: 150,
      description: 'Car description test',
      fineAmount: 60,
      licensePlate: '123XZZ',
      name: 'Car test',
    });

    await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });
  });

  it('should not be able to add a new car specification to a non existent car', async () => {
    const carId = '1234';
    const specification = await createSpecificationUseCase.execute({
      name: '4 rodas',
      description: '4 rodas',
    });

    const specificationsId = [specification.id];

    await expect(
      createCarSpecificationUseCase.execute({ carId, specificationsId }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });
});
