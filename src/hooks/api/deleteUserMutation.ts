import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";

export const useDeleteUserMutation = () => {
  const deleteUserMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.deleteUser(`${payload.id}`),
    onSuccess: () => {
      toast.success("Xóa người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return deleteUserMutation;
};
