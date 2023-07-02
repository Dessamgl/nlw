import { Router } from 'express';
import { CreateRentService } from '../../services/CreateRentService';

const rentsRoutes = Router();

rentsRoutes.post('/create', async (req, res) => {
  const { bookId, userId, initialDate, finalDate } = req.body;

  const rentsService = new CreateRentService();

  const rent = await rentsService.execute({
    book_id: bookId,
    user_id: userId,
    rent_initial: new Date(initialDate),
    rent_final: new Date(finalDate)
  });

  return res.json({ id: rent.id });
});

export { rentsRoutes };
