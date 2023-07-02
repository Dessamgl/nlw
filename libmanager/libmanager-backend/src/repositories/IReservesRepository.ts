import { Reserve } from '../entities/Reserve';
import { ICreateReserveDTO } from './dtos/ICreateReserveDTO';

interface IReservesRepository {
  create(data: ICreateReserveDTO): Promise<Reserve>;
}

export { IReservesRepository };
