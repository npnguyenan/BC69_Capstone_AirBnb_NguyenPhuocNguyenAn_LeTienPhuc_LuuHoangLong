import { useQuery } from "@tanstack/react-query";
import { binhLuanServices } from "../../services";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CommentTemplate } from "./CommentTemplate";
import {
  quanLyBinhLuanActions,
  useQuanLyBinhLuanSelector,
} from "../../stores/quanLyBinhLuan";
import { useAppDispatch } from "../../stores";
import { useQuanLyNguoiDungSelector } from "../../stores/quanLyNguoiDung";
import { DeleteCommentTemplate } from "./DeleteCommentTemplate";

export const CommentByRoomTemplate = () => {
  const { reloadCmt } = useQuanLyBinhLuanSelector();
  const { user } = useQuanLyNguoiDungSelector();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  console.log("id: ", id);
  let { data: cmtList, refetch: refetchCmt } = useQuery({
    queryKey: ["BinhLuanTheoPhong"],
    queryFn: async () => {
      return binhLuanServices.getBinhLuanTheoPhong(`${id}`);
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      refetchCmt(); // Gọi lại API khi id phòng thay đổi
    }
  }, [id, refetchCmt]);

  // Reload lại API mỗi khi người dùng đăng bình luận
  useEffect(() => {
    if (reloadCmt) {
      refetchCmt();
      dispatch(quanLyBinhLuanActions.setReloadCmt(false));
    }
  }, [reloadCmt, refetchCmt]);

  const commentList = cmtList?.data.content;
  console.log("commentList: ", commentList);

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }
  return (
    <div>
      {commentList?.length == 0 ? (
        <p>Chưa có bình luận</p>
      ) : (
        commentList?.map((cmt) => {
          return (
            <div
              key={cmt.id}
              className="grid grid-cols-12 my-10 py-10 bg-slate-50 2xl:grid-cols-12 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-7"
              style={{ borderRadius: 15 }}
            >
              <div className="col-span-1 m-10 mt-20">
                <img
                  src={
                    cmt.avatar
                      ? cmt.avatar
                      : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                  }
                  alt=""
                  style={{ borderRadius: "50%", width: 50, height: 50 }}
                />
              </div>
              <div className="col-span-11 mx-10 2xl:col-span-9 2xl:mx-10 xl:col-span-9 lg:col-span-7 md:col-span-6 sm:col-span-6">
                <div className="mx-10 ">
                  <h2 className="text-[17px] font-500 sm:text-[15px]">
                    {cmt.tenNguoiBinhLuan}
                  </h2>
                  <p className="my-[5px] sm:text-[13px] sm:my-0">
                    {cmt.noiDung}
                  </p>
                </div>
                <div className="mx-10 inline">
                  <p className="2xl:mx-10">
                    {cmt.saoBinhLuan}/5
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span className="ms-10 ">
                      {" "}
                      {formatDateTime(cmt.ngayBinhLuan)}
                    </span>
                    {user?.user?.role == "ADMIN" ? (
                      <DeleteCommentTemplate idCmt={cmt.id} />
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
      {user ? <CommentTemplate /> : <></>}
    </div>
  );
};
