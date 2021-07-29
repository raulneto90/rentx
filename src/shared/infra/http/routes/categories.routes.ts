import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '@modules/cars/useCases/createCategory';
import { importCategoryController } from '@modules/cars/useCases/importCategory';
import { listCategoriesController } from '@modules/cars/useCases/listCategories';

const upload = multer({
  dest: './tmp',
});

const categoriesRouter = Router();

categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.get('/', listCategoriesController.handle);
categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouter };
