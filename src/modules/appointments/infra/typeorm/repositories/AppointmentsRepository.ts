import { getRepository, Repository} from 'typeorm';
import IAppointmentRepository from '../../../repositories/IAppointmentsRepository';
import IAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointments';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
      where: { date },

    });

    return findAppointment;
  }

  public async create(data: IAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);

    await this.ormRepository.save(appointment);

    return appointment

  }

}

export default AppointmentRepository;
