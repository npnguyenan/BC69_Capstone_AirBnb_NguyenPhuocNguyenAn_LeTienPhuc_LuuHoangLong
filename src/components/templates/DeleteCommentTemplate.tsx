import { useDeleteCommentMutation } from "../../hooks/api";

type Props = {
  idCmt: number;
};
export const DeleteCommentTemplate = (props: Props) => {
  const { idCmt } = props;

  const deleteCommentMutation = useDeleteCommentMutation();
  return (
    <span
      className="font-400 hover:text-red-500 cursor-pointer inline ms-20"
      onClick={() => {
        deleteCommentMutation.mutate(idCmt);
      }}
    >
      Xóa bình luận
    </span>
  );
};
