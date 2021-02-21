import { Router } from 'express';
import {parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticaded);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();

//   return res.json(appointments);
// })

appointmentsRouter.post('/', async (req, res) => {

  const { provider_id, date} = req.body;
  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentRepository;

  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
