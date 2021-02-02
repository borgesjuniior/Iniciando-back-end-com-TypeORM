import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string,
  avatarFilename: string,
}

class UpdateUserAvatar {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new Error('Only authenticaded users can change avatar');
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
