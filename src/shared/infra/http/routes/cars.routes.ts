import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { ensureUserAdmin } from '../middlewares/EnsureUserAdmin';

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRouter.use(ensureAuthenticated);
carsRouter.post('/', ensureUserAdmin, createCarController.handle);
carsRouter.get('/available', listAvailableCarsController.handle);
carsRouter.post(
  '/:id/specifications',
  ensureUserAdmin,
  createCarSpecificationController.handle,
);

export { carsRouter };
