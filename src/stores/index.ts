import { configureStore } from "@reduxjs/toolkit";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung";

export const store = configureStore({
  reducer: { quanLyBinhLuanReducer, quanLyNguoiDungReducer },
});

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<(typeof store)["getState"]>;
