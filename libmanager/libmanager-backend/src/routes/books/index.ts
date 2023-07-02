import { Router } from 'express';
import { CreateBookService } from '../../services/CreateBookService';
import { ListBookService } from '../../services/ListBookService';

const booksRoutes = Router();

booksRoutes.post('/create', async (req, res) => {
  const { title, author, isbn, pages } = req.body;

  const booksService = new CreateBookService();

  const book = await booksService.execute({
    title,
    author,
    isbn,
    pages,
  });

  return res.json({ isbn: book.isbn });
});

booksRoutes.get('/', async (request, response) => {
  const listBookService = new ListBookService();

  const books = await listBookService.execute();

  return response.json(books);
});

export { booksRoutes };
