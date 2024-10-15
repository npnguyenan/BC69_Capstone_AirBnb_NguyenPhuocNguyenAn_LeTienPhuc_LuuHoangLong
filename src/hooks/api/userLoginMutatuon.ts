import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType } from "../../schemas";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../stores";
import { userServices } from "../../services";
import { quanLyDangNhapActions } from "../../stores/quanLyDangNhap";
import { sleep } from "../../utils";

export const userLoginMutatuon = () => {
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginSchemaType) => userServices.dangNhap(payload),
    onSuccess: async (data) => {
      // Lưu thông tin đăng nhập của user vào redux
      dispatch(quanLyDangNhapActions.setUser(data.data.content));

      toast.success("Đăng nhập thành công");
      await sleep(1000);
      window.location.reload();
    },
    onError: (err: any) => {
      console.log("err: ", err);
      toast.error(err.response.data.content);
    },
  });

  return loginMutation;
};
