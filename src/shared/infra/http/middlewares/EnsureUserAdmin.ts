import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

export async function ensureUserAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user) throw new ErrorHandler('User not found', 404);

  if (!user.isAdmin)
    throw new ErrorHandler(
      'You need administrative profile to proceed this request',
      401,
    );

  return next();
}
