import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { binhLuanServices } from "../../services";
import { Comment } from "../../@types";
import { useAppDispatch } from "../../stores";
import { quanLyBinhLuanActions } from "../../stores/quanLyBinhLuan";
import { sleep } from "../../utils";

export const useDeleteCommentMutation = () => {
  const dispatch = useAppDispatch();
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => binhLuanServices.deleteBinhLuan(`${id}`),
    onSuccess: async () => {
      toast.success("Xóa bình luận thành công");
      await sleep(2000);
      dispatch(quanLyBinhLuanActions.setReloadCmt(true));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return deleteCommentMutation;
};
