import { inject, injectable } from 'tsyringe';

import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userDriverLicenseExists =
      await this.usersRepository.findByDriverLicense(data.driverLicense);
    const userEmailExists = await this.usersRepository.findByEmail(data.email);

    if (userDriverLicenseExists || userEmailExists) {
      throw new ErrorHandler('User already exists');
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}
