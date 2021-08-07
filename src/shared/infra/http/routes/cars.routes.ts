import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { ensureUserAdmin } from '../middlewares/EnsureUserAdmin';

const carsRouter = Router();
const createCarController = new CreateCarController();

carsRouter.use(ensureAuthenticated);
carsRouter.post('/', ensureUserAdmin, createCarController.handle);

export { carsRouter };
