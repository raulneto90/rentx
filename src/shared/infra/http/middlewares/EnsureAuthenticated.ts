import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/Authentication';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandler('Token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, authConfig.secret) as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(id);

    if (!user) throw new ErrorHandler('Token invalid', 401);

    request.user = {
      id,
    };

    return next();
  } catch (error) {
    throw new ErrorHandler('Token invalid', 401);
  }
}
