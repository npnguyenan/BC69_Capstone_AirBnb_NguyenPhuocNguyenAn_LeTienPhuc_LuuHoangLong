import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { useAppDispatch } from "../../stores";
// import { quanLyNguoiDungActions } from "../../stores/quanLyNguoiDung";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";
import { sleep } from "../../utils";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();
  const updateUserMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.updateUser(`${payload.id}`, payload),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
      sleep(3000);
      navigate(PATH.addUser);
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return updateUserMutation;
};
