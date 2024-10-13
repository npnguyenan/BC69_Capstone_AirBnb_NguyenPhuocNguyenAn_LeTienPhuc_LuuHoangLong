import { Location } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const viTriServices = {
  getLocation: () => api.get<HttpResponse<Location[]>>("/vi-tri"),
};
