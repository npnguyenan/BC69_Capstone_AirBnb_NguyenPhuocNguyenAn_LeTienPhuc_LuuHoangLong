import { createAsyncThunk } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services";
import { sleep } from "../../utils";
// import { User } from "../../@types";

const getDanhSach = createAsyncThunk(
  "quanLyDatPhong/getDanhSach",
  // payload: giá trị truyền vào khi action được dispatch
  async (payload: any, { rejectWithValue }) => {
    try {
      console.log("payload: ", payload);

      await sleep(2000);

      const result = await nguoiDungServices.getDanhSach(payload);
      console.log("result: ", result);

      return result.data.content;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  }
);

export const quanLyNguoiDungThunks = { getDanhSach };
