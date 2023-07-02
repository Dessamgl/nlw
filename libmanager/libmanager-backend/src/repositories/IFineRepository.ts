import { Fine } from '../entities/Fine';
import { ICreateFineDTO } from './dtos/ICreateFine';

interface IFineRepository {
  create(data: ICreateFineDTO): Promise<Fine>;
  list(): Promise<Fine[]>;
}

export { IFineRepository };
