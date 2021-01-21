import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


interface Request {
  email: string;
  password: string;
}

class AuthenticateUserSerice {
    public async execute({ email, password }: Request): Promise<{ user: User, token: string}> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.'); //Se o usuário não for encontrado no banco de dados ele retorna um erro.
    }


    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.'); //Se a senha não bater com a do banco de dados retorna um erro.
    }

    const token =  sign({}, '123456', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserSerice;
