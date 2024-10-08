import { createSlice } from "@reduxjs/toolkit";

type InitialState = {};

const initialState: InitialState = {};

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {},
});
