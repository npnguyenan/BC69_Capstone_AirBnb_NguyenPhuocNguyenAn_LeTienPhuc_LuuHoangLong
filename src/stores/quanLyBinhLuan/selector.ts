import { useSelector } from "react-redux";
import { RootState } from "..";

export const useQuanLyBinhLuanSelector = () =>
  useSelector((state: RootState) => state.quanLyBinhLuanReducer);
