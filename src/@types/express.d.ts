/**
 * Anexa/define um novo tipo para a biblioteca express
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  };

}
