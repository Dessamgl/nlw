import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/implementations/UsersRepository';

class ListUserService {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.list();

    return users;
  }
}

export { ListUserService };
