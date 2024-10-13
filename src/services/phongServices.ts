import { Room } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const phongServices = {
  getRoom: () => api.get<HttpResponse<Room[]>>("/phong-thue"),
  getDetailRoom: (id: any) => api.get<HttpResponse<Room>>(`/phong-thue/${id}`),
};
