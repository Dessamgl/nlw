import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

@EntityRepository()
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name: data.name,
      email: data.email,
      is_admin: data.is_admin,
      password: data.password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    if (!user) return undefined;

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}

export { UsersRepository };
