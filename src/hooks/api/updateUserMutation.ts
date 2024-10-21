import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";
import { sleep } from "../../utils";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../stores";
import { userActions } from "../../stores/quanLyNguoiDung";

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateUserMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.updateUser(`${payload.id}`, payload),
    onSuccess: async () => {
      toast.success("Cập nhật người dùng thành công");
      dispatch(userActions.setReloadAPI(true));
      await sleep(2000);
      dispatch(userActions.setReloadAPI(false));
      navigate(PATH.addUser);
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return updateUserMutation;
};
