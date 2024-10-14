import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType } from "../../schemas";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../stores";
import { userServices } from "../../services";
import { quanLyNguoiDungActions } from "../../stores/quanLyNguoiDung";

export const userLoginMutatuon = () => {
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginSchemaType) => userServices.dangNhap(payload),
    onSuccess: (data) => {
      // Lưu thông tin đăng nhập của user vào redux
      dispatch(quanLyNguoiDungActions.setUser(data.data.content));

      window.location.reload();
    },
    onError: (err: any) => {
      console.log("err: ", err);
      toast.error(err.response.data.content);
    },
  });

  return loginMutation;
};
