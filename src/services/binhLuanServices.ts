import { Comment, CommentByRoom } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/binh-luan",
});

export const binhLuanServices = {
  getDanhSach: () => api.get<HttpResponse<Comment[]>>(``),
  getBinhLuanTheoPhong: (query = "") =>
    api.get<HttpResponse<CommentByRoom[]>>(
      `/lay-binh-luan-theo-phong/${query}`
    ),
  postBinhLuan: (payload: Comment) =>
    api.post<HttpResponse<CommentByRoom[]>>(``, payload),
  deleteBinhLuan: (query = "") =>
    api.delete<HttpResponse<CommentByRoom[]>>(`/${query}`),
};
