import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserSevice';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import UsersRepository from '../../typeorm/repositories/usersRepository';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository;

  const { name, email, password } = req.body;

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  //delete user.password; //Não mostra a senha na listagem de usuários

  res.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), async (req, res) => {
  const usersRepository = new UsersRepository;
  const updateUserAvatar = new UpdateUserAvatar(usersRepository)

  const user = await updateUserAvatar.execute({
    user_id: req.user.id,
    avatarFilename: req.file.filename,
  });

  return res.json(user);

})

export default usersRouter;
