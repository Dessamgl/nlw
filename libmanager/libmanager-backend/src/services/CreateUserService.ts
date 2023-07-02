import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/implementations/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({
    name,
    email,
    admin = false,
    password,
  }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new AppError('Invalid e-mail');
    }

    const userAlreadyExists = await usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      is_admin: admin,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };
