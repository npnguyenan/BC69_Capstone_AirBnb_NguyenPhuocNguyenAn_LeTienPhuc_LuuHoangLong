import { Button, Input } from "antd";
import { useQuanLyNguoiDungSelector } from "../../stores/quanLyNguoiDung";
import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import $ from "jquery";
import { useState } from "react";
import { Comment } from "../../@types";
import { useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../hooks/api";
import "../../styles/Comment.css";
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
  let { data: userData } = useQuery({
    queryKey: ["InfoUser", user?.user?.id],
    queryFn: async () => {
      if (user) {
        return nguoiDungServices.getUserById(`${user?.user?.id}`);
      }
      return null;
    },
  });

  // Chức năng rating bình luận
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
  const postCommentMutation = usePostCommentMutation();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    commentData.noiDung = comment;
    postCommentMutation.mutate(commentData);
    // Reset textarea sau khi gửi
    setComment("");
  };
  return (
    <div className=" grid grid-cols-6 my-[20px] lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-8">
      <div className="col-span-1 my-[40px] w-[60px] h-[60px] lg:w-[60px] md:w-[60px] sm:w-[60px]">
        <img src={userInfo?.avatar} style={{ borderRadius: "50%" }} />
      </div>
      <div className="mx-[10px] col-span-5 relative lg:col-span-9 md:col-span-7 sm:col-span-7">
        <form onSubmit={handleSubmit}>
          <Input.TextArea
            placeholder="Viết bình luận"
            value={comment} // Liên kết giá trị với state
            onChange={(e) => setComment(e.target.value)} // Cập nhật state khi thay đổi
            className="w-full px-[30px] pt-[30px] pe-[60px] text-[15px]"
            style={{ height: 150, borderRadius: 15 }}
          />
          <Button
            htmlType="submit"
            className="absolute top-[50px] right-[10px]"
            style={{ border: "1px transparent" }}
          >
            <i className="fa-regular fa-paper-plane text-[20px]"></i>
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
