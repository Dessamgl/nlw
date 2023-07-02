import { Router } from 'express';
import { CreateReserveService } from '../../services/CreateReserveService';

const reservesRoutes = Router();

reservesRoutes.post('/create', async (req, res) => {
  const { bookId, userId, reserveDays } = req.body;

  const reservesService = new CreateReserveService();

  const reserve = await reservesService.execute({
    book_id: bookId,
    user_id: userId,
    reserve_limit_date: new Date(reserveDays),
  });

  return res.json({ id: reserve.id });
});

export { reservesRoutes };
