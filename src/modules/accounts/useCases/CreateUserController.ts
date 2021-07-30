import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { driverLicense, password, email, name }: ICreateUserDTO =
      request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      driverLicense,
      password,
      email,
      name,
    });

    return response.status(201).json(classToClass(user));
  }
}
