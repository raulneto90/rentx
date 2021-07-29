import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ErrorHandler } from '@shared/errors/ErrorHandler';

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(
    file: Express.Multer.File | undefined,
  ): Promise<ICreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const categories: ICreateCategoryDTO[] = [];
      if (file) {
        const stream = fs.createReadStream(file.path);
        const parseFile = csvParse();

        stream.pipe(parseFile);

        parseFile
          .on('data', async line => {
            const [name, description] = line;
            categories.push({ name, description });
          })
          .on('end', () => resolve(categories))
          .on('error', err => {
            reject(err);
          });
      } else reject(new ErrorHandler('CSV file not provided'));
    });
  }

  async execute(file: Express.Multer.File | undefined): Promise<void> {
    if (!file) throw new ErrorHandler('CSV file not provided');

    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existentCategory = await this.categoriesRepository.findByName(name);
      if (!existentCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
