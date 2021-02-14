import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import {parseISO } from 'date-fns';

import AppointmentRepository from '../../../repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

import ensureAuthenticaded from '../../../../../modules/users/infra/http/middlewares/ensureAuthenticaded';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticaded);



appointmentsRouter.get('/', async (req, res) => {
  //console.log(req.user);
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
})

appointmentsRouter.post('/', async (req, res) => {

  const { provider_id, date} = req.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
