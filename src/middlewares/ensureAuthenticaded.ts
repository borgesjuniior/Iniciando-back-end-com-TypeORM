import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';


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
    throw new Error('JWT token is missing.');
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
    throw new Error('Invalid JWT token')

  }


}
