import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { useAppDispatch } from "../../stores";
// import { quanLyNguoiDungActions } from "../../stores/quanLyNguoiDung";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";

export const useDeleteUserMutation = () => {
  //   const dispatch = useAppDispatch();
  const deleteUserMutation = useMutation({
    mutationFn: (payload: User) =>
      nguoiDungServices.deleteUser(`${payload.id}`),
    onSuccess: () => {
      //   dispatch(quanLyNguoiDungActions.(payload));
      toast.success("Xóa người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return deleteUserMutation;
};
