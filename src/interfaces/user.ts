export type TUser = {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  imageVersion?: string;
  birthday: Date;
  interests?: string[];
};

export type ICreateUserRequestDTO = {
  email: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  password: string;
  interests?: string[];
};

export type ICreateUserRequestFormDTO = {
  email: string;
  birthdayDay: number;
  birthdayMonth: string;
  birthdayYear: number;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  password: string;
  interests?: string[];
};

export type IUserLoginRequestDTO = {
  email: string;
  password: string;
};

export type IUserLoginResponseDTO = {
  id: string;
  email: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  imageVersion?: string;
  status: string;
  token: string;
  interests?: string[];
};

export type ICreateUserReturnDTO = {
  email: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  token: string;
  interests?: string[];
};
