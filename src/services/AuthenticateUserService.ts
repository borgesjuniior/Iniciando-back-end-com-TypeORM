import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';


interface Request {
  email: string;
  password: string;
}

class AuthenticateUserSerice {
    public async execute({ email, password }: Request): Promise<{ user: User }> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.'); //Se o usuário não for encontrado no banco de dados ele retorna um erro.
    }


    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.'); //Se a senha não bater com a do banco de dados retorna um erro.
    }

    return { user };
  }
}

export default AuthenticateUserSerice;
