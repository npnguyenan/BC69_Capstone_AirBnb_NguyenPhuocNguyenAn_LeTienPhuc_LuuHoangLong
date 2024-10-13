import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../utils";
import { binhLuanServices } from "../../services";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
type Props = {
  roomId: number;
};
export const CommentByRoomTemplate = () => {
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
      refetchCmt(); // Gọi lại API khi userId thay đổi
    }
  }, [id, refetchCmt]);

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
              className="grid grid-cols-12 my-10 py-10 bg-slate-50"
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
                  width={60}
                  height={60}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="col-span-11 mx-10">
                <div className="mx-10">
                  <h2 className="text-[17px] font-500">
                    {cmt.tenNguoiBinhLuan}
                  </h2>
                  <p className="my-[5px]">{cmt.noiDung}</p>
                </div>
                <div className="mx-10">
                  <p>
                    {cmt.saoBinhLuan}/5
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span className="ms-10">
                      {" "}
                      {formatDateTime(cmt.ngayBinhLuan)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

// avatar:"http://sc04.alicdn.com/kf/Hc3e61591078043e09dba7808a6be5d21n.jpg",
// id:7968,
// ngayBinhLuan:"2024-08-21",
// noiDung:"Phòng quá đẹp",
// saoBinhLuan:5,
// tenNguoiBinhLuan:"admin",
