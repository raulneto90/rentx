import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);
routes.use('/accounts', usersRouter);
routes.use('/sessions', authenticateRouter);
routes.use('/cars', carsRouter);

export { routes };
