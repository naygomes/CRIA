export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
