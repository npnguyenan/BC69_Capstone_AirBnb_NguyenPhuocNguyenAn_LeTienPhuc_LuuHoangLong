export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export type LoginAPIResponse = {
  email: string;
  password: string;
};

export type RegisterAPIResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

//   "id": 0,
//   "name": "string",
//   "email": "string",
//   "password": "string",
//   "phone": "string",
//   "birthday": "string",
//   "gender": true,
//   "role": "string
