import { User } from '../entities/User';
import { ICreateUserDTO } from './dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
