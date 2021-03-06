import { startOfHour } from "date-fns";
import {injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
};

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository
    ) {}

  public async execute({ date, provider_id}: Request): Promise<Appointment> {
  const appointmentDate = startOfHour(date);

  const findAppointmentSameDate = await this.appointmentsRepository.findByDate (
    appointmentDate,
  )

  if (findAppointmentSameDate) {
    throw new AppError('This appointment is already booked');

  }

  const appointment = await this.appointmentsRepository.create({
    provider_id,
    date: appointmentDate,
  });


  return appointment;
 }


}

export default CreateAppointmentService;
