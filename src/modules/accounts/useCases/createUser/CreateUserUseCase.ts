import { hashSync } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ErrorHandler } from '@shared/errors/ErrorHandler';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    driverLicense,
    name,
    password,
    email,
  }: ICreateUserDTO): Promise<User> {
    const userDriverLicenseExists =
      await this.usersRepository.findByDriverLicense(driverLicense);
    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userDriverLicenseExists || userEmailExists) {
      throw new ErrorHandler('User already exists');
    }

    const passwordHashed = hashSync(password, 8);

    const user = await this.usersRepository.create({
      driverLicense,
      email,
      name,
      password: passwordHashed,
    });

    return user;
  }
}
