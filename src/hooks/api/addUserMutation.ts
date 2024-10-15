import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";

export const useAddUserMutation = () => {
  const addUserMutation = useMutation({
    mutationFn: (payload: User) => nguoiDungServices.addUser(payload),
    onSuccess: () => {
      toast.success("Thêm người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return addUserMutation;
};
