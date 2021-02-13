import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../error/AppError';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}


export default function ensureAuthenticaded(req: Request , res: Response, next: NextFunction): void {
  //Validação do token JWT

  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if(!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [,token] = authHeader.split(' '); //Divide o token

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    }

    console.log(decoded);

    return next();
  } catch (error){
    res.send(error)
    throw new AppError('Invalid JWT token', 401)

  }


}
