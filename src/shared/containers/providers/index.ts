import { container } from 'tsyringe';

import { DayJsProvider } from './DateProvider/implementations/DayJsProvider';
import { IDateProvider } from './DateProvider/models/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);
