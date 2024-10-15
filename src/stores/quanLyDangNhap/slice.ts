import { LoginAPIResponse } from "../../@types/QuanLyUser";
import { createSlice } from "@reduxjs/toolkit";
import { userThunks } from "./thunk";
import { RegisterSchemaType } from "../../schemas";
import { sleep, storage } from "../../utils";
import { localStorageKeys } from "../../constants";
import { toast } from "react-toastify";

type InitialState = {
  isLoadingRegister: boolean;
  userRegister?: RegisterSchemaType;

  // Lưu thông tin đăng nhập của user
  user: LoginAPIResponse | null;
};

const initialState: InitialState = {
  isLoadingRegister: false,
  userRegister: undefined,
  user: storage(localStorageKeys.USER),
};

const { dangKy } = userThunks;

export const {
  reducer: quanLyDangNhapReducer,
  actions: quanLyDangNhapActions,
} = createSlice({
  name: "user",
  initialState,

  // Xử lý action đồng bộ.
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      // Lưu user vào local storage
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(payload));
    },
    logOut: (state) => {
      // Xóa thông tin user ở store
      state.user = null;
      toast.success("Đăng xuất");
      sleep(100);
      //  Xóa thông tin user ở local storage
      localStorage.removeItem(localStorageKeys.USER);
    },
  },

  // Xử lý action bất đồng bộ (gọi API)
  extraReducers(builder) {
    builder
      .addCase(dangKy.pending, (state) => {
        state.isLoadingRegister = true;
        console.log("pending");
      })

      // Gọi API thành công
      .addCase(dangKy.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        console.log("fulfilled");
        state.isLoadingRegister = false;
        state.userRegister = payload;
      })

      // Gọi API thất bại
      .addCase(dangKy.rejected, (state) => {
        console.log("rejected");
        state.isLoadingRegister = false;
      });
  },
});
