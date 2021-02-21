import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepositoruy {
  create(data: IAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
