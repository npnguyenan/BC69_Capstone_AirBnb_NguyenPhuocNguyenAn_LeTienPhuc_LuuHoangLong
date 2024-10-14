import { configureStore } from "@reduxjs/toolkit";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan";
import { useDispatch } from "react-redux";
import { userReducer } from "./quanLyNguoiDung";

export const store = configureStore({
  reducer: { quanLyBinhLuanReducer, userReducer },
});

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<(typeof store)["getState"]>;
