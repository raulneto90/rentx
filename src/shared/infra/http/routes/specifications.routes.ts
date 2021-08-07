import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { ensureUserAdmin } from '../middlewares/EnsureUserAdmin';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.use(ensureAuthenticated);
specificationsRouter.use(ensureUserAdmin);
specificationsRouter.post('/', createSpecificationController.handle);

export { specificationsRouter };
