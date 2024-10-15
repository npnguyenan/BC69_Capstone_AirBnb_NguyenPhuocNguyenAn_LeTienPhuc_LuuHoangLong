import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types";
import { localStorageKeys } from "../../constants";

// import { quanLyNguoiDungThunks } from "./thunk";
type InitialState = {
  user: User | null;
  users: User[] | [];
  userId: number | null;
  isEditUser: boolean;
};

const initialState: InitialState = {
  user: null,
  users: [],
  userId: null,
  isEditUser: false,
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
    setUserList: (state, { payload }) => {
      state.users = payload;
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((item) => item.id != payload.id);
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
      // Lưu user vào local storage
    },
    setIsEditUser: (state, { payload }) => {
      state.isEditUser = payload;
      // Lưu user vào local storage
    },
  },
});
