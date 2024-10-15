import { configureStore } from "@reduxjs/toolkit";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan";
import { useDispatch } from "react-redux";
import { quanLyDangNhapReducer } from "./quanLyDangNhap";
import { userReducer } from "./quanLyNguoiDung";
import { quanLyDatPhongReducer } from "./quanLyDatPhong";

export const store = configureStore({
  reducer: {
    quanLyBinhLuanReducer,
    quanLyDangNhapReducer,
    quanLyDatPhongReducer,
    userReducer
  },
});

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<(typeof store)["getState"]>;
