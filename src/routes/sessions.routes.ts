import { Router } from 'express';
import AuthenticateUserSerice from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {

    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserSerice;

    const { user } = await authenticateUser.execute({
      email,
      password
    })

    //delete user.password;



    res.json({ user });
  } catch (err) {

    return res.status(400).json({ error: err.message });
  }

});

export default sessionsRouter;
