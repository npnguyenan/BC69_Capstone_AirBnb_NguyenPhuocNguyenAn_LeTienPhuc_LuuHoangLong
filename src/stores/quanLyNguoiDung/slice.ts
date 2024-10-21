import { createSlice } from "@reduxjs/toolkit";
import { LoginAPIResponse } from "../../@types";
import { localStorageKeys } from "../../constants";
import { RegisterSchemaType } from "../../schemas";
import { storage } from "../../utils";

type InitialState = {
  userId: number | null;
  isEditUser: boolean;
  isLoadingRegister: boolean;
  userRegister?: RegisterSchemaType;
  updateAvatar: boolean;
  avatarPreview: string | undefined;
  editInfo: boolean;
  reloadAPI: boolean;
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
  editInfo: false,
  reloadAPI: false,
};

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
    setEditInfo: (state, { payload }) => {
      state.editInfo = payload;
    },
    setReloadAPI: (state, { payload }) => {
      state.reloadAPI = payload;
    },
  },
});
