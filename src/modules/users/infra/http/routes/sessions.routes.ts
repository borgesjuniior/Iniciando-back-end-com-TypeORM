import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/usersRepository'

const sessionsRouter = Router();


sessionsRouter.post('/', async (req, res) => {

  const usersRepository = new UsersRepository;

  const { email, password } = req.body;


  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  //delete user.password;



  res.json({ user, token });

});

export default sessionsRouter;
