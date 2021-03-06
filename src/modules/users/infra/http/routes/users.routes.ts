import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';

import UsersController from '../controllers/UsersController';

import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create)

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), async (req, res) => {
  const updateUserAvatar = container.resolve(UpdateUserAvatar);

  const user = await updateUserAvatar.execute({
    user_id: req.user.id,
    avatarFilename: req.file.filename,
  });

  return res.json(user);

})

export default usersRouter;
