import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateUserService } from '../../services/CreateUserService';
import { ListUserService } from '../../services/ListUserService';

const userRoutes = Router();

userRoutes.post(
  '/create',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      admin: Joi.boolean(),
      password: Joi.string().min(6).required(),
    }),
  }),
  async (request, response) => {
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password,
    });

    return response.json({ email: user.email });
  },
);

userRoutes.get('/', async (request, response) => {
  const listUserService = new ListUserService();

  const users = await listUserService.execute();

  return response.json(users);
});

export { userRoutes };
