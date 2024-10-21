import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";
import { useAppDispatch } from "../../stores";
import { sleep } from "../../utils";
import { userActions } from "../../stores/quanLyNguoiDung";

export const useDeleteUserMutation = () => {
  const dispatch = useAppDispatch();
  const deleteUserMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.deleteUser(`${payload.id}`),
    onSuccess: async () => {
      toast.success("Xóa người dùng thành công");
      dispatch(userActions.setReloadAPI(true));
      await sleep(2000);
      dispatch(userActions.setReloadAPI(false));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return deleteUserMutation;
};
