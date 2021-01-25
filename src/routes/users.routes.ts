import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserSevice';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), (req, res) => {
  console.log(req.file);

  return res.json({message: true});
})

export default usersRouter;
