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
  image?: Buffer;
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
  image?: Buffer;
  password: string;
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