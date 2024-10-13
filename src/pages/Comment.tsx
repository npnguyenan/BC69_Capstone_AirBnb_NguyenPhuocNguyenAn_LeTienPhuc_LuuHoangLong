import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils";
import { binhLuanServices } from "../services";

export const Comment = () => {
  // let { data } = useQuery({
  //   queryKey: ["DanhSachBinhLuan"],
  //   queryFn: async () => {
  //     await sleep(1000 * 1);
  //     return binhLuanServices.getDanhSach();
  //   },
  //   staleTime: 5 * 60 * 1000,
  //   // true:  gọi API, false: ko gọi
  //   enabled: true,
  // });
  const maPhong = 7;
  let { data } = useQuery({
    queryKey: ["BinhLuanTheoPhong"],
    queryFn: async () => {
      await sleep(1000 * 1);
      return binhLuanServices.getBinhLuanTheoPhong(maPhong.toString());
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
  });

  console.log("data: ", data?.data.content);
  return (
    <div>
      <h1>Trang quản lý bình luận</h1>
    </div>
  );
};
