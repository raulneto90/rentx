import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ErrorHandler } from '@shared/errors/ErrorHandler';
import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';
import createConnection from '@shared/infra/database';
import '@shared/containers';

import { routes } from './routes';
import swaggerFile from './swagger.json';

const app = express();

createConnection();

app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ErrorHandler) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({ message: error.message });
  },
);

export default app;
