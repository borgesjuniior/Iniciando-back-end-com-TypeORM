import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create);

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), UserAvatarController.update);

export default usersRouter;
