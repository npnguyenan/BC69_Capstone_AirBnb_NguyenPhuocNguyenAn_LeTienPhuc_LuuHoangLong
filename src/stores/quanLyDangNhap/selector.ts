import { useSelector } from "react-redux";
import { RootState } from "..";

export const quanLyDangNhapSelector = () =>
  useSelector((state: RootState) => state.quanLyDangNhapReducer);
