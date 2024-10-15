import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  reloadCmt: boolean;
};

const initialState: InitialState = {
  reloadCmt: false,
};

export const {
  reducer: quanLyBinhLuanReducer,
  actions: quanLyBinhLuanActions,
} = createSlice({
  name: "quanLyBinhLuan",
  initialState,
  reducers: {
    setReloadCmt: (state, { payload }) => {
      state.reloadCmt = payload;
    },
  },
});
