import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';


export default function ensureAuthenticaded(req: Request , res: Response, next: NextFunction): void {
  //Validação do token JWT

  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new Error('JWT token is missing.');
  }

  const [, token] = authHeader.split(''); //Divide o token

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded);

    return next();
  } catch (error){
    throw new Error('Invalid JWT token');
  }


}
