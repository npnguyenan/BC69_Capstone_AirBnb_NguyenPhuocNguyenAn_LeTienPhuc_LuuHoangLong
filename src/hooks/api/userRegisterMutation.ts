// rafc

import { useMutation } from "@tanstack/react-query";
import { RegisterSchemaType } from "../../schemas";
import { sleep } from "../../utils";
import { userServices } from "../../services";
import { toast } from "react-toastify";

// JS docs để note document

/**
 * @param a: string, b: number
 * @returns registerMuatation
 * @description thực hiện đăng ký user
 */

export const userRegisterMutation = () => {
  const registerMutation = useMutation({
    mutationKey: ["Register"],
    mutationFn: async (payload: RegisterSchemaType) => {
      return userServices.dangKy(payload);
    },
    onSuccess: async () => {
      // Hàm đc gọi khi API thành công
      toast.success("Đăng ký thành công");

      await sleep(1000);
      window.location.reload();
    },
    onError: (err: any) => {
      //Hàm đc gọi khi API thất bại
      toast.error(err?.response?.data?.content);
    },
  });

  return registerMutation;
};
