import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";
import { useAppDispatch } from "../../stores";
import { userActions } from "../../stores/quanLyNguoiDung";
import { sleep } from "../../utils";

export const useAddUserMutation = () => {
  const dispatch = useAppDispatch();
  const addUserMutation = useMutation({
    mutationFn: (payload: User) => nguoiDungServices.addUser(payload),
    onSuccess: async () => {
      toast.success("Thêm người dùng thành công");
      dispatch(userActions.setReloadAPI(true));
      await sleep(2000);
      dispatch(userActions.setReloadAPI(false));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return addUserMutation;
};
