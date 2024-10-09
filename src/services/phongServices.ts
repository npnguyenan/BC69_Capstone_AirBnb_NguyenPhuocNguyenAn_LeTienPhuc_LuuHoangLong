import { Phim } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const phongServices = {
  getPhong: () => api.get<HttpResponse<Phim[]>>("/phong-thue"),
};
