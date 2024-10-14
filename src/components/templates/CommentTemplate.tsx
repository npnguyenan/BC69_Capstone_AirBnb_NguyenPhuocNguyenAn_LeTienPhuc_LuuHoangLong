import { Button, Input } from "antd";
import { useQuanLyNguoiDungSelector } from "../../stores/quanLyNguoiDung";
import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import $ from "jquery";
import { useState } from "react";
import { Comment } from "../../@types";
import { useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../hooks/api";

export const CommentTemplate = () => {
  const { user } = useQuanLyNguoiDungSelector();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const now = new Date();

  const commentData: Comment = {
    id: 0,
    maNguoiBinhLuan: Number(user?.user?.id),
    maPhong: Number(id),
    noiDung: "",
    saoBinhLuan: rating,
    ngayBinhLuan: now.toISOString(),
  };
  console.log("commentData: ", commentData);
  let { data: userData } = useQuery({
    queryKey: ["InfoUser", user?.user?.id],
    queryFn: async () => {
      if (user) {
        return nguoiDungServices.getUserById(`${user?.user?.id}`);
      }
      return null;
    },
  });

  $(function () {
    const star: string = ".star";
    const selected: string = ".selected";

    // Đảm bảo $(star) có kiểu dữ liệu chính xác
    $(star).on("click", function (this: HTMLElement) {
      $(selected).each(function (this: HTMLElement) {
        // Xóa class 'selected' khỏi các phần tử đã chọn
        $(this).removeClass("selected");
      });

      // Thêm class 'selected' vào phần tử được click
      $(this).addClass("selected");
    });
  });

  const userInfo = userData?.data.content;
  console.log("userInfo: ", userInfo);
  console.log("commentData before: ", commentData);
  const postCommentMutation = usePostCommentMutation();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    commentData.noiDung = comment;
    postCommentMutation.mutate(commentData);
    // Reset textarea sau khi gửi
    setComment("");
  };
  return (
    <div className="w-full grid grid-cols-12 my-30">
      <div className="col-span-1 my-20">
        <img
          src={userInfo?.avatar}
          style={{ width: 60, height: 60, borderRadius: "50%" }}
        />
      </div>
      <div className="col-span-11 relative">
        <form onSubmit={handleSubmit}>
          <Input.TextArea
            placeholder="Viết bình luận"
            value={comment} // Liên kết giá trị với state
            onChange={(e) => setComment(e.target.value)} // Cập nhật state khi thay đổi
            className="w-full px-20 pt-20 pe-[60px] text-[15px]"
            style={{ height: 100, borderRadius: 15 }}
          />
          <Button
            htmlType="submit"
            className="absolute top-30 right-10"
            style={{ border: "1px transparent" }}
          >
            <i className="fa-regular fa-paper-plane text-20"></i>
          </Button>
        </form>
        <div>
          <span className="font-400 me-10">Đánh giá:</span>
          <ul className="ratings inline">
            <li className="star" onClick={() => setRating(5)}></li>
            <li className="star" onClick={() => setRating(4)}></li>
            <li className="star" onClick={() => setRating(3)}></li>
            <li className="star" onClick={() => setRating(2)}></li>
            <li className="star" onClick={() => setRating(1)}></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
