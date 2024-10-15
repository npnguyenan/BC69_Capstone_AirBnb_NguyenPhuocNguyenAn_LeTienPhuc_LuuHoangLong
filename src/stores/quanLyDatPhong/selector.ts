import { useSelector } from "react-redux";
import { RootState } from "..";

export const useQuanLyDatPhongSelector = () =>
  useSelector((state: RootState) => state.quanLyDatPhongReducer);
