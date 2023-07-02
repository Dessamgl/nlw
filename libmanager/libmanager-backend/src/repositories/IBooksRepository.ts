import { Book } from '../entities/Book';
import { ICreateBookDTO } from './dtos/ICreateBookDTO';

interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findByISBN(isbn: string): Promise<Book | undefined>;
  list(): Promise<Book[]>;
}

export { IBooksRepository };
