import { Reservation } from "../@types";
import { apiInstance } from "../constants";
import { ReservationSchemaType } from "../schemas";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

export const datphongServices = {
  getReservation: () => api.get<HttpResponse<Reservation[]>>("/dat-phong"),
  getDetailReservation: (id: any) =>
    api.get<HttpResponse<Reservation>>(`/dat-phong/${id}`),
  deleteReservation: (query = "") =>
    api.delete<HttpResponse<Reservation[]>>(`/dat-phong/${query}`),
  addReservation: (payload: Reservation) =>
    api.post<HttpResponse<ReservationSchemaType[]>>(`/dat-phong`, payload),
  getReservationById: (id: any) =>
    api.get<HttpResponse<ReservationSchemaType[]>>(`/dat-phong/${id}`),
  getDetailReservationByUser: (id: any) =>
    api.get<HttpResponse<Reservation>>(`/dat-phong/lay-theo-nguoi-dung/${id}`),
  updateReservation: (query = "", payload: Reservation) =>
    api.put<HttpResponse<Reservation[]>>(`/dat-phong/${query}`, payload),
};
