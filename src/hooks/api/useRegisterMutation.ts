import { useMutation } from "@tanstack/react-query";
import { RegisterSchemaType } from "../../schemas";
import { quanLyNguoiDungServices } from "../../services";
import { sleep } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

// js docs để note document 
/**
 * @param a: string, h: number
 * @returns registerMutation
 * @description thực hiện đăng kí User
 */

export const useRegisterMutation = () => {
    const navigate = useNavigate()
  const registerMutation = useMutation({
    mutationKey: ["Register"],
    mutationFn: async (payload: RegisterSchemaType) => {
      await sleep(2000);
      return quanLyNguoiDungServices.dangKy(payload);
    },
    onSuccess: () => {
      // hàm được gọi khi call API thành công
      toast.success("Bạn đã đăng ký thành công");

      // chuyển người dùng đến trang đăng nhập
      navigate(PATH.login)
    },
    onError: (error: any) => {
      // hàm được gọi khi call API thất bại
      toast.error(error?.response?.data?.content);
    },
  });
  return registerMutation;
};
