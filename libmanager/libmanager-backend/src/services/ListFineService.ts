import { getCustomRepository } from 'typeorm';
import { Fine } from '../entities/Fine';
import { FineRepository } from '../repositories/implementations/FineRepository';

class ListFineService {
  async execute(): Promise<Fine[]> {
    const finesRepository = getCustomRepository(FineRepository);

    const users = await finesRepository.list();

    return users;
  }
}

export { ListFineService };
