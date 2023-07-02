interface ICreateUserDTO {
  name: string;
  email: string;
  is_admin?: boolean;
  password: string;
}

export { ICreateUserDTO };
