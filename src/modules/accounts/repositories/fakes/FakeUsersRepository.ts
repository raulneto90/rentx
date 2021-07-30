import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data, {
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async findByDriverLicense(driverLicense: string): Promise<User | undefined> {
    return this.users.find(user => user.driverLicense === driverLicense);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
