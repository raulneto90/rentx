import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { FakeRentalsRepository } from '../repositories/fakes/FakeRentalsRepository';
import { CreateRentalUseCase } from '../useCases/createRental/CreateRentalUseCase';

describe('CreateRentalUseCase', () => {
  let fakeRentalsRepository: FakeRentalsRepository;
  let createRentalUseCase: CreateRentalUseCase;

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(fakeRentalsRepository);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another open to same user', async () => {
    await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        userId: '12345',
        carId: '235664',
        expectedReturnDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should not be able to create a new rental if there is another open to same car', async () => {
    await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        userId: '23132',
        carId: '54321',
        expectedReturnDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });
});
