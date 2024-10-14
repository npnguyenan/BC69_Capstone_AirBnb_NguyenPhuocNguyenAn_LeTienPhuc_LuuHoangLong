import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { nguoiDungServices } from "../../services";
import { useAppDispatch } from "../../stores";
import { userActions } from "../../stores/quanLyNguoiDung";

export const useUpdateAvatarMutation = () => {
  const dispatch = useAppDispatch();
  const updateAvatarMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      return await nguoiDungServices.updateAvatar(payload);
    },
    onSuccess: () => {
      toast.success("Cập nhật ảnh đại diện thành công");
      dispatch(userActions.setUpdateAvatar(false));
    },
    onError: (error: any) => {
      console.log("error: ", error);
      toast.error(error.response.data.content);
    },
  });
  return updateAvatarMutation;
};
