import { getCustomRepository } from 'typeorm';
import { Book } from '../entities/Book';
import { AppError } from '../errors/AppError';
import { BooksRepository } from '../repositories/implementations/BooksRepository';

interface IBookRequest {
  title: string;
  author: string;
  isbn: string;
  pages: string;
}

class CreateBookService {
  async execute({ author, title, isbn, pages }: IBookRequest): Promise<Book> {
    const booksRepository = getCustomRepository(BooksRepository);

    const bookAlreadyExists = await booksRepository.findByISBN(isbn);

    if (bookAlreadyExists) {
      throw new AppError('Book already exists');
    }

    if (!isbn) {
      throw new AppError('Invalid ISBN');
    }

    const book = await booksRepository.create({
      author,
      isbn,
      title,
      pages,
    });

    return book;
  }
}

export { CreateBookService };
