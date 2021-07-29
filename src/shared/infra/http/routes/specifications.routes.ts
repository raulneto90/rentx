import { Router } from 'express';

import { createSpecificationController } from '@modules/cars/useCases/createSpecification';

const specificationsRouter = Router();

specificationsRouter.post('/', createSpecificationController.handle);

export { specificationsRouter };
