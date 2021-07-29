import { Router } from 'express';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouter = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.get('/', listCategoriesController.handle);

export { categoriesRouter };
