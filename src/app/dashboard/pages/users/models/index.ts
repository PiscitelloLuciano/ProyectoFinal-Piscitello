export interface IUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
  rol: 'admin' | 'user';
}
