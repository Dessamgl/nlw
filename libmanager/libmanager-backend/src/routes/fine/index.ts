import { Router } from 'express';
import { CreateFineService } from '../../services/CreateFineService';
import { ListFineService } from '../../services/ListFineService';

const finesRoutes = Router();

finesRoutes.post('/create', async (request, response) => {
  const { userId } = request.body;

  const createFineService = new CreateFineService();

  await createFineService.execute({
    user_id: userId,
  });

  return response.json({ userId });
});

finesRoutes.get('/', async (request, response) => {
  const listFineService = new ListFineService();

  const fineUsers = await listFineService.execute();

  return response.json(fineUsers);
});

export { finesRoutes };
