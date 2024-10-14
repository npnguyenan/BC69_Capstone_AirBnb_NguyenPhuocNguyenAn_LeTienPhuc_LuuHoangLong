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

// const { getDanhSach } = quanLyNguoiDungThunks;

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  name: "quanLyNguoiDung",
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

  // Xử lý action bất đồng bộ (gọi API)
  // extraReducers(builder) {
  //   builder
  //     .addCase(getDanhSach.pending, (state) => {
  //       console.log("state: ", state);
  //       // state.isLoadingRegister = true;
  //       console.log("pending");
  //     })

  //     //   Gọi api thành công
  //     .addCase(getDanhSach.fulfilled, (state, { payload }) => {
  //       console.log("state: ", state);
  //       console.log("payload: ", payload);
  //       console.log("fulfilled");
  //       // state.isLoadingRegister = false;
  //       // state.userRegister = payload;
  //     })

  //     //   Gọi api thất bại
  //     .addCase(getDanhSach.rejected, (state) => {
  //       console.log("rejected: ");
  //       // state.isLoadingRegister = false;
  //     });
  // },
});
