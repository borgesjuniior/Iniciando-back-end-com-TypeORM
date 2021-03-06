// Seguindo os padrões da arquitura RestFull o controller deve conter apenas 5 métodos
// sendo eles index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserSevice';


class UsersController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    //delete user.password; //Não mostra a senha na listagem de usuários

    res.json(user);


  }
}

export default new UsersController;
