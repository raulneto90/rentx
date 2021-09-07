import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const rentalsRouter = Router();
const createRentalController = new CreateRentalController();

rentalsRouter.use(ensureAuthenticated);
rentalsRouter.post('/', createRentalController.handle);

export { rentalsRouter };
