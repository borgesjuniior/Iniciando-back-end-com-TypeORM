// Seguindo os padrões da arquitura RestFull o controller deve conter apenas 5 métodos
// sendo eles index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    //delete user.password;



    res.json({ user, token });

  }
}

export default new SessionsController;
