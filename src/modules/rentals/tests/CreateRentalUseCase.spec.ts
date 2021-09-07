import dayjs from 'dayjs';

import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { FakeRentalsRepository } from '../repositories/fakes/FakeRentalsRepository';
import { CreateRentalUseCase } from '../useCases/createRental/CreateRentalUseCase';

describe('CreateRentalUseCase', () => {
  let fakeRentalsRepository: FakeRentalsRepository;
  let createRentalUseCase: CreateRentalUseCase;

  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(fakeRentalsRepository);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another open to same user', async () => {
    await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: '12345',
        carId: '235664',
        expectedReturnDate: dayAdd24Hours,
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should not be able to create a new rental if there is another open to same car', async () => {
    await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: '23132',
        carId: '54321',
        expectedReturnDate: dayAdd24Hours,
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should not be able to create a new rental if expected return date is before 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        userId: '23132',
        carId: '54321',
        expectedReturnDate: dayjs().toDate(),
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });
});
