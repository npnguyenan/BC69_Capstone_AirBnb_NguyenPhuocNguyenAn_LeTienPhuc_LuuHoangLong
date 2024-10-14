import { createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../../services";
import { RegisterSchemaType } from "../../schemas";
import { sleep } from "../../utils";

const dangKy = createAsyncThunk(
  "user/dangKy",
  async (payload: RegisterSchemaType, thunkAPI) => {
    try {
      console.log("thunkAPI: ", thunkAPI);
      console.log("payload: ", payload);

      await sleep(2000);

      const result = await userServices.dangKy(payload);
      console.log("result: ", result);

      return result.data.content;
    } catch (err) {
      const { rejectWithValue } = thunkAPI;
      console.log("err: ", err);
      return rejectWithValue(err);
    }
  }
);

export const userThunks = { dangKy };
