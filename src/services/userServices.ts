import { LoginAPIResponse, User } from "../@types";
import { apiInstance } from "../constants";
import { LoginSchemaType, RegisterSchemaType } from "../schemas";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const userServices = {
  dangKy: (payload: RegisterSchemaType) =>
    api.post<HttpResponse<User>>("auth/signup", payload),

  dangNhap: (payload: LoginSchemaType) =>
    api.post<HttpResponse<LoginAPIResponse>>("/auth/signin", payload),
};
