import { Router } from 'express';
import { booksRoutes } from './books';
import { finesRoutes } from './fine';
import { rentsRoutes } from './rents';
import { reservesRoutes } from './reserve';
import { userRoutes } from './users';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/books', booksRoutes);

routes.use('/reserves', reservesRoutes);

routes.use('/fines', finesRoutes);

routes.use('/rents', rentsRoutes);

routes.get('/howdy', (req, res) => {
  res.status(200).send({
    status: 'OK',
    message: 'Howdy partner!!!',
  });
});

export { routes };
