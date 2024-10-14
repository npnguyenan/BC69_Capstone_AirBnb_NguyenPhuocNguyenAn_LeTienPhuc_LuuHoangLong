import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { binhLuanServices } from "../../services";
import { Comment } from "../../@types";
import { useAppDispatch } from "../../stores";
import { quanLyBinhLuanActions } from "../../stores/quanLyBinhLuan";
import { sleep } from "../../utils";

export const usePostCommentMutation = () => {
  const dispatch = useAppDispatch();
  const postCommentMutation = useMutation({
    mutationFn: (payload: Comment) => binhLuanServices.postBinhLuan(payload),
    onSuccess: async () => {
      toast.success("Bình luận thành công");
      await sleep(2000);
      dispatch(quanLyBinhLuanActions.setReloadCmt(true));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return postCommentMutation;
};
