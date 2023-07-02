import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Fine } from '../../entities/Fine';
import { AppError } from '../../errors/AppError';
import { ICreateFineDTO } from '../dtos/ICreateFine';
import { IFineRepository } from '../IFineRepository';

@EntityRepository()
class FineRepository implements IFineRepository {
  private ormRepository: Repository<Fine>;

  private usersRepository: Repository<Fine>;

  constructor() {
    this.ormRepository = getRepository(Fine);
  }

  public async list(): Promise<Fine[]> {
    const fines = await this.ormRepository.find();

    return fines;
  }

  public async create(data: ICreateFineDTO): Promise<Fine> {
    const fine = this.ormRepository.create({
      user_id: data.user_id,
    });

    await this.ormRepository.save(fine);

    return fine;
  }
}

export { FineRepository };
