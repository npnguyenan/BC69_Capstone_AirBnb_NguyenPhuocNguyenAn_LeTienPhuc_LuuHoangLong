import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ToastifyProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <ToastContainer />
      {children}
    </Fragment>
  );
};
