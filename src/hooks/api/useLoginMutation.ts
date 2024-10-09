import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType } from "../../schemas";
import { quanLyNguoiDungServices } from "../../services";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginSchemaType) =>
      quanLyNguoiDungServices.dangNhap(payload),
    onSuccess: (data) => {
      console.log("data: ", data.data.content);
      // Lưu thông tin đăng nhập của user vào redux
      dispatch(quanLyNguoiDungActions.setUser(data.data.content));

      // đnhập thành công điều hướng đến HOME
      navigate("/");
    },

    onError: (error: any) => {
      console.log("error: ", error);
      toast.error(error?.response?.data?.content);
    },
  });

  return loginMutation
};
