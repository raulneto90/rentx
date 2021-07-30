import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/Authentication';
import { IAuthenticateUserDTO } from '@modules/accounts/dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

interface IResponse {
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorHandler('E-mail or password incorrect');
    }

    const passwordMatched = compareSync(password, user.password);

    if (!passwordMatched) {
      throw new ErrorHandler('E-mail or password incorrect');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { token };
  }
}
