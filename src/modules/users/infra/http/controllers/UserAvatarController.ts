// Seguindo os padrões da arquitura RestFull o controller deve conter apenas 5 métodos
// sendo eles index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserSevice';


class UserAvatarController {
  public async update(req: Request, res: Response) {

  }
}

export default new UserAvatarController;
