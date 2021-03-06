import { Router } from 'express';
const sessionsRouter = Router();
import SessionsController from '../controllers/SessionsController';


sessionsRouter.post('/', SessionsController.create);

export default sessionsRouter;
