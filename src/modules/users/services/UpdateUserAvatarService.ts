import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string,
  avatarFilename: string,
}

class UpdateUserAvatar {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new AppError('Only authenticaded users can change avatar', 401);
    };

    if(user.avatar) {
      //Deletar avatar anterior
      const userAvatarFilePatch = path.join(uploadConfig.directory, user.avatar);
      const  userAvatarFileExists = await fs.promises.stat(userAvatarFilePatch);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePatch);
      };
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatar;