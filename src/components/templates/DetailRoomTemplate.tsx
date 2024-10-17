import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { datphongServices, phongServices } from "../../services";
import { Row, Col, Typography, Input, Button, DatePicker, Card } from "antd";
import { CommentByRoomTemplate } from "./CommentByRoomTemplate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ReservationSchema, ReservationSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { userReservationMutation } from "../../hooks/api/userReservationMutation";
import { useEffect, useState } from "react";
import moment from "moment";
import Meta from "antd/es/card/Meta";

const { Title, Paragraph } = Typography;
interface Item {
  id: any;
  key: any; // Kiểu mở rộng để bao gồm các thuộc tính khác
}
interface ReservationResponse {
  data?: {
    content?: Record<string, Item[]>; // Hoặc ReserListData
  };
}

export const DetailRoomTemplate = () => {
  const reservationMutation = userReservationMutation();
  const [userId, setUserId] = useState<string>("0");

  const { id } = useParams();
  let userData: any = null;
  let itemFound = false; // Tạo một flag để theo dõi xem đã tìm thấy item hay chưa
  let myObject = []; // Định nghĩa myObject là một mảng các đối tượng Item
  userData = localStorage.getItem("USER");
  useEffect(() => {
    // Lấy ID từ localStorage khi component mount
    if (userData) {
      const storedUser = userData ? JSON.parse(userData) : null;
      setUserId(storedUser.user.id); // Lưu ID vào state
    }
  }, []); // Dependency array trống để chỉ chạy một lần khi component được mount

  if (userData) {
    let { data: reserListData }: { data?: ReservationResponse } = useQuery({
      queryKey: ["GetDatPhongByUser", userId],
      queryFn: () => datphongServices.getDetailReservationByUser(userId),
    });
    // Kiểm tra và chuyển đổi kiểu cho reserListData2
    const reserListData2 = reserListData?.data?.content as
      | Record<string, any>
      | undefined;

    if (reserListData2) {
      console.log("reserListData2: ", reserListData2);
      // Kiểm tra xem reserListData2 có tồn tại hay không
      for (const key in reserListData2) {
        for (const innerKey in reserListData2[key]) {
          if (innerKey === "maPhong") {
            let temp = reserListData2[key][innerKey];
            if (Number(temp) === Number(id)) {
              console.log("Found item with id: ", temp);
              itemFound = true;
              break; // Nếu tìm thấy item, dừng vòng lặp
            }
          }
        }
        if (itemFound) {
          myObject.push(reserListData2[key]); // Thêm đối tượng vào mảng
          itemFound = false;
        }
      }
    }
    console.log("myObject", myObject);

    console.log("userId", userId);
  }

  const { data: roomListData } = useQuery({
    queryKey: ["DetailRoom", id],
    queryFn: () => phongServices.getDetailRoom(id),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReservationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(ReservationSchema),
  });

  const room = roomListData?.data?.content;

  if (!room) return <div>Loading...</div>;

  // onSubmit chỉ đc gọi khi validation ko có errors
  const onSubmit: SubmitHandler<ReservationSchemaType> = async (values) => {
    let bookingDetail = {
      ...values,
      id: 0,
      maNguoiDung: Number(userId),
      maPhong: Number(room?.id),
    };

    reservationMutation.mutate(bookingDetail);
    console.log("Giá trị form sau khi submit:", bookingDetail); // Log giá trị của form
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title
        level={3}
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        {room.tenPhong}
      </Title>

      {/* img  */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={room.hinhAnh}
          alt={room.tenPhong}
          style={{
            width: "100%",
            maxHeight: "300px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* mô tả */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          <Paragraph>
            <strong style={{ fontWeight: "600" }}>{room.giuong}</strong> giường
            &middot; <strong>{room.phongTam}</strong> phòng tắm
          </Paragraph>
          <Paragraph>{room.moTa}</Paragraph>
        </Col>
        <Col xs={24} sm={8}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-red-600">
                Giá: {room.giaTien.toLocaleString("vi-VN")} VND / đêm
              </p>
            </div>
            {userData && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                      <Input type="hidden" {...field} value={0} /> // Đảm bảo newId luôn có giá trị
                    )}
                  />
                  <Controller
                    name="maPhong"
                    control={control}
                    render={({ field }) => (
                      <input type="hidden" {...field} value={0} /> // Đảm bảo room.id luôn có giá trị
                    )}
                  />
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Nhận phòng
                    </label>

                    <Controller
                      name="ngayDen"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format="DD/MM/YYYY"
                          value={
                            field.value
                              ? moment(field.value, "DD/MM/YYYY")
                              : null
                          }
                          onChange={(date) =>
                            field.onChange(
                              date ? date.format("DD/MM/YYYY") : null
                            )
                          }
                        />
                      )}
                    />
                    {errors.ngayDen && (
                      <p className="text-red-500">{errors.ngayDen.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Trả phòng
                    </label>

                    <Controller
                      name="ngayDi"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format="DD/MM/YYYY"
                          value={
                            field.value
                              ? moment(field.value, "DD/MM/YYYY")
                              : null
                          }
                          onChange={(date) =>
                            field.onChange(
                              date ? date.format("DD/MM/YYYY") : null
                            )
                          }
                        />
                      )}
                    />

                    {errors.ngayDi && (
                      <p className="text-red-500">{errors.ngayDi.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      số lượng Khách
                    </label>
                    <Controller
                      name="soLuongKhach"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          status={errors.soLuongKhach && "error"}
                          {...field}
                          value={field.value || 0} // Đảm bảo field.value luôn có giá trị
                        />
                      )}
                    />
                    {errors.soLuongKhach && (
                      <p className="text-red-500">
                        {errors.soLuongKhach.message}
                      </p>
                    )}
                  </div>

                  <Controller
                    name="maNguoiDung"
                    control={control}
                    render={({ field }) => (
                      <input type="hidden" {...field} value={0} /> // Đảm bảo userId luôn có giá trị
                    )}
                  />
                  <Button
                    htmlType="submit"
                    loading={reservationMutation.isPending}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Đặt phòng
                  </Button>
                </form>
              </>
            )}
          </div>
        </Col>
      </Row>

      <Row className="pt-4 cursor-default" gutter={[16, 16]}>
        <Col span={16}></Col>
        <Col span={8}>
          {userData && (
            <>
              {myObject && (
                <>
                  <h2>Danh sách đã đăng ký</h2>
                  <Row gutter={16}>
                    {myObject.map((room) => (
                      <Row className="p-1" key={room.id}>
                        <Col span={8}>
                          <Card hoverable style={{ width: 240 }}>
                            <Meta
                              title={`Phòng ${room.id}`}
                              description={`Từ: ${moment(room.ngayDen).format(
                                "DD/MM/YYYY"
                              )} \n Đến: ${moment(room.ngayDi).format(
                                "DD/MM/YYYY"
                              )}`}
                            />
                          </Card>
                        </Col>
                      </Row>
                    ))}
                  </Row>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={24}>
          <Title level={4} style={{ fontWeight: "bold" }}>
            Tiện nghi phòng
          </Title>
          <Row gutter={[16, 16]} style={{ textAlign: "left" }}>
            <Col xs={24} sm={12}>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                WiFi: <strong>{room.wifi ? "Có" : "Không"}</strong>
              </div>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                Tivi: <strong>{room.tivi ? "Có" : "Không"}</strong>
              </div>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                Điều hòa: <strong>{room.dieuHoa ? "Có" : "Không"}</strong>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                Bếp: <strong>{room.bep ? "Có" : "Không"}</strong>
              </div>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                Máy giặt: <strong>{room.mayGiat ? "Có" : "Không"}</strong>
              </div>
              <div
                style={{ padding: "10px", borderBottom: "1px solid #e9ecef" }}
              >
                Chỗ đỗ xe: <strong>{room.doXe ? "Có" : "Không"}</strong>
              </div>
              <div style={{ padding: "10px" }}>
                Hồ bơi: <strong>{room.hoBoi ? "Có" : "Không"}</strong>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="flex justify-center mt-20">
        <div className="w-6/12 bg-red-">
          <h1 className="text-20 font-400 my-5 mx-10">Bình luận</h1>
          <div
            className="px-20 py-20 bg-gray-200"
            style={{
              borderRadius: "15px",
            }}
          >
            <CommentByRoomTemplate />
          </div>
        </div>
      </div>
    </div>
  );
};
