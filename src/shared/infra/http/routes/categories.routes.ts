import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/Upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { ensureUserAdmin } from '../middlewares/EnsureUserAdmin';

const upload = multer(uploadConfig.upload('tmp'));

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.use(ensureAuthenticated);
categoriesRouter.use(ensureUserAdmin);
categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.get('/', listCategoriesController.handle);
categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouter };
