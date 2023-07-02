import { getCustomRepository } from 'typeorm';
import { Book } from '../entities/Book';
import { BooksRepository } from '../repositories/implementations/BooksRepository';

class ListBookService {
  async execute(): Promise<Book[]> {
    const booksRepository = getCustomRepository(BooksRepository);

    const books = await booksRepository.list();

    return books;
  }
}

export { ListBookService };
