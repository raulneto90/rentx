import { FakeCarsRepository } from '../repositories/fakes/FakeCarsRepository';
import { CreateCarUseCase } from '../useCases/createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from '../useCases/listAvailableCars/ListAvailableCarsUseCase';

describe('ListAvailableCarsUseCase', () => {
  let fakeCarsRepository: FakeCarsRepository;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123456',
      dailyRate: 80,
      description: 'New car test',
      fineAmount: 10,
      licensePlate: 'ABCD-1234',
      name: 'Car test',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect.arrayContaining(cars);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car name', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123456',
      dailyRate: 80,
      description: 'New car test',
      fineAmount: 10,
      licensePlate: 'ABCD-1234',
      name: 'Car test',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car test' });

    expect.arrayContaining(cars);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car categoryId', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123456',
      dailyRate: 80,
      description: 'New car test',
      fineAmount: 10,
      licensePlate: 'ABCD-1234',
      name: 'Car test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: '123456',
    });

    expect.arrayContaining(cars);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car brand', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand test',
      categoryId: '123456',
      dailyRate: 80,
      description: 'New car test',
      fineAmount: 10,
      licensePlate: 'ABCD-1234',
      name: 'Car test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand test',
    });

    expect.arrayContaining(cars);
    expect(cars).toEqual([car]);
  });
});
