import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticaded);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();

//   return res.json(appointments);
// })

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
