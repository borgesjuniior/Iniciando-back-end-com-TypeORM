import { Router } from 'express';
import CreateUserService from '../services/CreateUserSevice';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    //delete user.password; //Não mostra a senha na listagem de usuários

    res.json(user);
  } catch (err) {

    return res.status(400).json({ error: err.message });
  }

});

export default usersRouter;
