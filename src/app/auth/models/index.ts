export interface loginData {
  email: string | null;
  password: string | null;
}

export interface registerData {
  email: string;
  password: string;
  confirmPassword: string;
}
