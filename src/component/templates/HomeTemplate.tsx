import { useQuery } from "@tanstack/react-query";
import { phongServices } from "../../services";
import { Card } from "antd";

export const HomeTemplate = () => {
  const { data } = useQuery({
    queryKey: ["DanhSachPhong"],
    queryFn: () => phongServices.getPhong(),
  });
  console.log("data: ", data);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Danh Sách Phòng</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.content.map((phong) => {
          return (
            <div
              key={phong.id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative"
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={phong.tenPhong}
                    src={phong.hinhAnh}
                    className="w-auto h-48 object-cover"
                  />
                }
                className="border-none h-full"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{phong.tenPhong}</h3>
                  <p className="text-gray-500 mt-2">
                    Giá: {phong.giaTien.toLocaleString()} $/đêm
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                  Đặt ngay
                </button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
