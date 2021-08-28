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
  });
});
