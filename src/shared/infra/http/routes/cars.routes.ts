import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/Upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { ensureUserAdmin } from '../middlewares/EnsureUserAdmin';

const upload = multer(uploadConfig.upload('tmp/cars'));

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRouter.use(ensureAuthenticated);
carsRouter.post('/', ensureUserAdmin, createCarController.handle);
carsRouter.get('/available', listAvailableCarsController.handle);
carsRouter.post(
  '/:id/specifications',
  ensureUserAdmin,
  createCarSpecificationController.handle,
);
carsRouter.post(
  '/:id/images',
  ensureUserAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRouter };
