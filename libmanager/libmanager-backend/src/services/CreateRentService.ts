import { getCustomRepository } from 'typeorm';
import { Rent } from '../entities/Rent';
import { RentsRepository } from '../repositories/implementations/RentsRepository';

interface IRentRequest {
  book_id: string;
  user_id: string;
  rent_initial: Date;
  rent_final: Date;
}

class CreateRentService {
  async execute({
    book_id,
    user_id,
    rent_initial,
    rent_final,
  }: IRentRequest): Promise<Rent> {
    const rentsRepository = getCustomRepository(RentsRepository);

    const rent = await rentsRepository.create({
      book_id,
      user_id,
      rent_initial,
      rent_final,
    });

    return rent;
  }
}

export { CreateRentService };
