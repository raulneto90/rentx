import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  const data: ICreateUserDTO = {
    name: 'Test',
    email: 'test@test.com',
    driverLicense: '123456',
    password: '123456',
  };

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute(data);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('driverLicense');
    expect(user).toHaveProperty('isAdmin');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('should not be able to create an user with same driver license', async () => {
    await createUserUseCase.execute(data);

    await expect(createUserUseCase.execute(data)).rejects.toBeInstanceOf(
      ErrorHandler,
    );
  });

  it('should not be able to create an user with same email', async () => {
    await createUserUseCase.execute(data);

    data.driverLicense = '1234567';

    await expect(createUserUseCase.execute(data)).rejects.toBeInstanceOf(
      ErrorHandler,
    );
  });
});
