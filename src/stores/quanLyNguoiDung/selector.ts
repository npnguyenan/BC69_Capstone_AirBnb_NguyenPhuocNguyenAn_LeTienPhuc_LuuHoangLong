import { useSelector } from "react-redux";
import { RootState } from "..";

export const userSelector = () =>
  useSelector((state: RootState) => state.userReducer);
