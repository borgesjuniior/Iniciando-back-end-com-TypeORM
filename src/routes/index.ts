import { Router } from 'express';
import appointmentsRouter from '../routes/appointments.routes';
import usersRouter from '../routes/users.routes'

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
