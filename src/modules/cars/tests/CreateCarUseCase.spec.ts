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
});
