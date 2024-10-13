import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { useAppDispatch } from "../../stores";
// import { quanLyNguoiDungActions } from "../../stores/quanLyNguoiDung";
import { User } from "../../@types";
import { nguoiDungServices } from "../../services";

export const useAddUserMutation = () => {
  //   const dispatch = useAppDispatch();
  const addUserMutation = useMutation({
    mutationFn: (payload: User) => nguoiDungServices.addUser(payload),
    onSuccess: () => {
      //   dispatch(quanLyNguoiDungActions.(payload));
      toast.success("Thêm người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return addUserMutation;
};
