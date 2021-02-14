import { EntityRepository, Repository} from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointments';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findbydate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date },

    });

    return findAppointment || null;
  }

}

export default AppointmentRepository;