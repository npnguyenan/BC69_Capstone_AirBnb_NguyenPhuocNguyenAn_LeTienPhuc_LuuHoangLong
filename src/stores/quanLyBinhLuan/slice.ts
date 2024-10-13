import { createSlice } from "@reduxjs/toolkit";

type InitialState = {};

const initialState: InitialState = {};

export const {
  reducer: quanLyBinhLuanReducer,
  actions: quanLyBinhLuanActions,
} = createSlice({
  name: "quanLyBinhLuan",
  initialState,
  reducers: {},
});
