import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { Fine } from '../entities/Fine';
import { FineRepository } from '../repositories/implementations/FineRepository';

interface IFineRequest {
  user_id: string;
}

class CreateFineService {
  async execute({ user_id }: IFineRequest): Promise<Fine> {
    const fineRepository = getCustomRepository(FineRepository);

    const fineUser = await fineRepository.create({ user_id });

    return fineUser;
  }
}

export { CreateFineService };
