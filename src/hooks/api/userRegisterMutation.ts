// rafc

import { useMutation } from "@tanstack/react-query";
import { RegisterSchemaType } from "../../schemas";
import { sleep } from "../../utils";
import { userServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// JS docs để note document

/**
 * @param a: string, b: number
 * @returns registerMuatation
 * @description thực hiện đăng ký user
 */

export const userRegisterMutation = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationKey: ["Register"],
    // mutationFn: (payload: RegisterSchemaType) => userServices.dangKy(payload),
    mutationFn: async (payload: RegisterSchemaType) => {
      await sleep(2000);
      return userServices.dangKy(payload);
    },
    onSuccess: () => {
      // Hàm đc gọi khi API thành công
      toast.success("Đăng ký thành công");

      window.location.reload();
    },
    onError: (err: any) => {
      //Hàm đc gọi khi API thất bại
      toast.error(err?.response?.data?.content);
    },
  });

  return registerMutation;
};
