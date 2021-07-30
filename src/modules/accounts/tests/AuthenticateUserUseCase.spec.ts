import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AuthenticateUserUseCase } from '../useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

describe('AuthenticateUserUseCase', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
  });

  const data: ICreateUserDTO = {
    driverLicense: '123',
    email: 'test@test.com',
    name: 'Test',
    password: '123',
  };

  it('should be able to authenticate on api', async () => {
    await createUserUseCase.execute(data);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    expect(authenticatedUser).toHaveProperty('token');
  });

  it('should not be able to authenticate a non existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: data.email,
        password: data.password,
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await createUserUseCase.execute(data);

    await expect(
      authenticateUserUseCase.execute({
        email: data.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(ErrorHandler);
  });
});
