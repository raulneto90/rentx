import express, { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '@shared/errors/ErrorHandler';

import 'dotenv/config';
import 'reflect-metadata';
import '@shared/infra/database';
import '@shared/containers';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ErrorHandler) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({ message: error.message });
  },
);

export default app;
