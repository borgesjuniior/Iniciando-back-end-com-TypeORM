import { Router } from 'express';
import AuthenticateUserSerice from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {

    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserSerice;

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    //delete user.password;



    res.json({ user, token });
  } catch (err) {

    return res.status(400).json({ error: err.message });
  }

});

export default sessionsRouter;
