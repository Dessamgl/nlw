import { Rent } from '../entities/Rent';
import { ICreateRentDTO } from './dtos/ICreateRentDTO';

interface IRentsRepository {
  create(data: ICreateRentDTO): Promise<Rent>;
}

export { IRentsRepository };
