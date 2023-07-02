import { EntityRepository, getRepository, Repository } from 'typeorm';
import { isSaturday, isSunday } from 'date-fns';
import { Book } from '../../entities/Book';
import { Reserve } from '../../entities/Reserve';
import { User } from '../../entities/User';
import { AppError } from '../../errors/AppError';
import { IReservesRepository } from '../IReservesRepository';
import { Fine } from '../../entities/Fine';
import { ICreateReserveDTO } from '../dtos/ICreateReserveDTO';

@EntityRepository()
class ReservesRepository implements IReservesRepository {
  private ormRepository: Repository<Reserve>;

  private booksRepository: Repository<Book>;

  private usersRepository: Repository<User>;

  private finesRepository: Repository<Fine>;

  constructor() {
    this.ormRepository = getRepository(Reserve);
    this.booksRepository = getRepository(Book);
    this.usersRepository = getRepository(User);
    this.finesRepository = getRepository(Fine);
  }

  public async create(data: ICreateReserveDTO): Promise<Reserve> {
    const bookFound = await this.booksRepository.findOne({ id: data.book_id });
    const userFound = await this.usersRepository.findOne({ id: data.user_id });

    if (!bookFound) {
      throw new AppError('Livro não encontrado', 404);
    }
    if (!userFound) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const isAWeekendDate =
      isSaturday(data.reserve_limit_date) || isSunday(data.reserve_limit_date);

    if (isAWeekendDate) {
      throw new AppError(
        'Você não pode fazer uma reserva para o fim de semana',
      );
    }

    const userAlreadyHaveFiveBooksReserved = await this.ormRepository.find({
      user_id: data.user_id,
    });

    if (userAlreadyHaveFiveBooksReserved.length >= 5) {
      throw new AppError('Você já possui pelo menos 5 livros reservados', 404);
    }

    const bookAlreadyReserved = await this.ormRepository.findOne({
      book_id: data.book_id,
    });

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
      reserve_limit_date: data.reserve_limit_date,
    });

    await this.ormRepository.save(reserve);

    return reserve;
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
  }
}

export { ReservesRepository };
