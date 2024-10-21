import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types";
import { localStorageKeys } from "../../constants";

// import { quanLyNguoiDungThunks } from "./thunk";
type InitialState = {
  user: User | null;
  users: User[] | [];
  userId: number | null;
  isEditReservation: boolean;

  isAddReservation: boolean;
};

const initialState: InitialState = {
  user: null,
  users: [],
  userId: null,
  isEditReservation: false,
  isAddReservation: false,
};

export const {
  reducer: quanLyDatPhongReducer,
  actions: quanLyDatPhongActions,
} = createSlice({
  name: "quanLyDatPhong",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      // Lưu user vào local storage
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(payload));
    },
    setReservationList: (state, { payload }) => {
      state.users = payload;
      state.isAddReservation = payload;
    },
    deleteReservation: (state, { payload }) => {
      state.users = state.users.filter((item) => item.id != payload.id);
    },
    setReservationId: (state, { payload }) => {
      state.userId = payload;
      // Lưu user vào local storage
    },
    setIsEditReservation: (state, { payload }) => {
      state.isEditReservation = payload;
      // Lưu user vào local storage
    },
  },
});
