import { createSlice } from "@reduxjs/toolkit";
import { LoginAPIResponse, User } from "../../@types";
import { localStorageKeys } from "../../constants";
import { RegisterSchemaType } from "../../schemas";
import { storage } from "../../utils";
import { userThunks } from "./thunk";

type InitialState = {
  userId: number | null;
  isEditUser: boolean;
  isLoadingRegister: boolean;
  userRegister?: RegisterSchemaType;
  updateAvatar: boolean;
  avatarPreview: string | undefined;
  // Lưu thông tin đăng nhập của user
  user: LoginAPIResponse | null;
};

const initialState: InitialState = {
  userId: null,
  isEditUser: false,
  isLoadingRegister: false,
  userRegister: undefined,
  user: storage(localStorageKeys.USER),
  updateAvatar: false,
  avatarPreview: undefined,
};

const { dangKy } = userThunks;

export const { reducer: userReducer, actions: userActions } = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAbc: () => {},
    setUser: (state, { payload }) => {
      state.user = payload;

      // Lưu user vào local storage
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(payload));
    },
    logOut: (state) => {
      // Xóa thông tin user ở store
      state.user = null;

      //  Xóa thông tin user ở local storage
      localStorage.removeItem(localStorageKeys.USER);
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
    setIsEditUser: (state, { payload }) => {
      state.isEditUser = payload;
    },
    setUpdateAvatar: (state, { payload }) => {
      state.updateAvatar = payload;
    },
    setAvatarPreview: (state, { payload }) => {
      state.avatarPreview = payload;
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
