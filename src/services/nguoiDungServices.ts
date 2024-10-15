import { User } from "../@types";
import { apiInstance } from "../constants";
import { InputUserSchemaType } from "../schemas";
// import { LoginSchemaType } from "../schemas";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const nguoiDungServices = {
  getDanhSach: (query = "") => api.get<HttpResponse<User[]>>(`/users${query}`),
  deleteUser: (query = "") =>
    api.delete<HttpResponse<User[]>>(`/users?id=${query}`),
  addUser: (payload: User) =>
    api.post<HttpResponse<InputUserSchemaType[]>>(`/users`, payload),
  getUserById: (query = "") => api.get<HttpResponse<User>>(`/users/${query}`),
  getUserByName: (query = "") =>
    api.get<HttpResponse<User[]>>(`/users/search/${query}`),
  updateUser: (query = "", payload: User) =>
    api.put<HttpResponse<User[]>>(`/users/${query}`, payload),
  updateAvatar: (payload: FormData) =>
    api.post<HttpResponse<User[]>>(`/users/upload-avatar`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
