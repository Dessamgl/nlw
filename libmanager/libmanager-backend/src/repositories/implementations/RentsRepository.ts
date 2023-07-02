import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { Reserve } from '../../entities/Reserve';
import { User } from '../../entities/User';
import { AppError } from '../../errors/AppError';
import { Fine } from '../../entities/Fine';
import { Rent } from '../../entities/Rent';
import { ICreateRentDTO } from '../dtos/ICreateRentDTO';
import { IRentsRepository } from '../IRentsRepository';

@EntityRepository()
class RentsRepository implements IRentsRepository {
  private ormRepository: Repository<Rent>;

  private reservesRepository: Repository<Reserve>;

  private booksRepository: Repository<Book>;

  private usersRepository: Repository<User>;

  private finesRepository: Repository<Fine>;

  constructor() {
    this.ormRepository = getRepository(Rent);
    this.reservesRepository = getRepository(Reserve);
    this.booksRepository = getRepository(Book);
    this.usersRepository = getRepository(User);
    this.finesRepository = getRepository(Fine);
  }

  public async create(data: ICreateRentDTO): Promise<Rent> {
    const bookFound = await this.booksRepository.findOne({ id: data.book_id });
    const userFound = await this.usersRepository.findOne({ id: data.user_id });
    const reserveFound = await this.reservesRepository.findOne({ id: data.user_id });
    const hasRent = await this.ormRepository.findOne({ id: data.book_id })


    if (!userFound) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (!bookFound) {
      throw new AppError('Livro não encontrado', 404);
    }

    if (reserveFound) {
      throw new AppError('Este livro já está reservado', 404);
    }

    if (hasRent) {
      throw new AppError('Este livro já foi renovado', 404);
    }

    const bookAlreadyReserved = await this.reservesRepository.findOne({
      book_id: data.book_id,
    });

    const bookAlreadyRent = await this.ormRepository.findOne({
      book_id: data.book_id,
    });

    if (bookAlreadyRent) {
      throw new AppError('Este livro já está alugado');
    }

    if (bookAlreadyReserved) {
      throw new AppError('Este livro já está reservado');
    }

    const userHasPenalty = await this.finesRepository.findOne({
      user_id: data.user_id,
    });

    if (userHasPenalty) {
      throw new AppError('Você possui pelo menos uma multa pendente');
    }

    const reserve = this.ormRepository.create({
      book_id: bookFound.id,
      user_id: userFound.id,
      rent_initial: data.rent_initial,
      rent_final: data.rent_final,
    });

    await this.ormRepository.save(reserve);

    return reserve;
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
  }
}

export { RentsRepository };
