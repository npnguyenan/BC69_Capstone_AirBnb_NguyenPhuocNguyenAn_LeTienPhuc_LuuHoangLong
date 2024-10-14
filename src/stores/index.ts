import { configureStore } from "@reduxjs/toolkit";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan";
import { useDispatch } from "react-redux";
import { userReducer } from "./quanLyDangNhap";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung";

export const store = configureStore({
  reducer: { quanLyBinhLuanReducer, userReducer, quanLyNguoiDungReducer },
});

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<(typeof store)["getState"]>;
