import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";
import { sleep } from "../../utils";
import { useAppDispatch } from "../../stores";
import { userActions } from "../../stores/quanLyNguoiDung";

export const useUpdateInfoMutation = () => {
  const dispatch = useAppDispatch();
  const updateInfoMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.updateUser(`${payload.id}`, payload),
    onSuccess: async () => {
      toast.success("Cập nhật hồ sơ thành công");

      dispatch(userActions.setEditInfo(false));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return updateInfoMutation;
};
