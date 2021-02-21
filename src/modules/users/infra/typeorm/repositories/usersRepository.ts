import { Repository} from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
  }

  public async findById(id: string): Promise<User| undefined> {
    const User = await this.ormRepository.findOne(id);

    return User;
  }

  public async findByEmail(email: string): Promise<User| undefined> {
    const User = await this.ormRepository.findOne(email);

    return User;
  }

  public async create(data: ICreateUsersDTO): Promise<User> {
    const User = this.ormRepository.create(data);

    await this.ormRepository.save(User);

    return User;

  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
