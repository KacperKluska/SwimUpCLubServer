export interface NewUserDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
  gender?: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  surname: string;
  email: string;
  role: string;
}
