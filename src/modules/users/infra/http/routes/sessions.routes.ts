import { Router } from 'express';
import AuthenticateUserSerice from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {

  const { email, password } = req.body;


  const authenticateUser = new AuthenticateUserSerice;

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  //delete user.password;



  res.json({ user, token });

});

export default sessionsRouter;
