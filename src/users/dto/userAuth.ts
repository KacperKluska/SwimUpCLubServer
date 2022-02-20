export interface newUserDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

export interface userLoginDTO {
  email: string;
  password: string;
}
