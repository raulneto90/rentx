import { inject, injectable } from 'tsyringe';

import { IUpdateUserAvatarDTO } from '@modules/accounts/dtos/IUpdateUserAvatarDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatarFile, userId }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ErrorHandler('User does not exists', 404);

    user.avatar = avatarFile;

    await this.usersRepository.update(user);
  }
}
