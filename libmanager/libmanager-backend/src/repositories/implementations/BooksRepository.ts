import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { IBooksRepository } from '../IBooksRepository';

@EntityRepository()
class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async findByISBN(isbn: string): Promise<Book | undefined> {
    const book = this.ormRepository.findOne({ isbn });

    return book;
  }

  public async create(data: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      author: data.author,
      isbn: data.isbn,
      title: data.title,
    });

    await this.ormRepository.save(book);

    return book;
  }

  public async delete(isbn: string): Promise<void> {
    this.ormRepository.delete({ isbn });
  }

  public async list(): Promise<Book[]> {
    const books = await this.ormRepository.find();

    return books;
  }
}

export { BooksRepository };
