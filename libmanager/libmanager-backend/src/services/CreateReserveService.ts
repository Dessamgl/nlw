import { getCustomRepository } from 'typeorm';
import { Reserve } from '../entities/Reserve';
import { ReservesRepository } from '../repositories/implementations/ReservesRepository';

interface IReserveRequest {
  book_id: string;
  user_id: string;
  reserve_limit_date: Date;
}

class CreateReserveService {
  async execute({
    book_id,
    user_id,
    reserve_limit_date,
  }: IReserveRequest): Promise<Reserve> {
    const reservesRepository = getCustomRepository(ReservesRepository);

    const reserve = await reservesRepository.create({
      book_id,
      user_id,
      reserve_limit_date,
    });

    return reserve;
  }
}

export { CreateReserveService };
