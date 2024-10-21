import { useQuery } from "@tanstack/react-query";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { datphongServices, phongServices } from "../../services";
import { Row, Col, Typography, Input, Button, DatePicker, Card } from "antd";
import { CommentByRoomTemplate } from "./CommentByRoomTemplate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ReservationSchema, ReservationSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateReservationMutation } from "../../hooks/api/updateReservationMutation";
import moment from "moment";
import Meta from "antd/es/card/Meta";
import { useAddReservationMutation } from "../../hooks/api/addReservationMutation";
import {
  quanLyDatPhongActions,
  useQuanLyDatPhongSelector,
} from "../../stores/quanLyDatPhong";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../stores";
import { Reservation } from "../../@types";
import { useDeleteReservationMutation } from "../../hooks/api/deleteReservationMutation";
import { useQuanLyNguoiDungSelector } from "../../stores/quanLyNguoiDung";
import { sleep } from "../../utils";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;
export const DetailRoomTemplate = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const addReservationMutation = useAddReservationMutation();
  const updateReservationMutation = useUpdateReservationMutation();
  const { isEditReservation, isAddReservation } = useQuanLyDatPhongSelector();
  const deleteReservationMutation = useDeleteReservationMutation();
  if (location.pathname == PATH.DetailRoom) {
    dispatch(quanLyDatPhongActions.setIsEditReservation(false));
  }
  const { id } = useParams();
  let itemFound = false; // Tạo một flag để theo dõi xem đã tìm thấy item hay chưa
  let myObject = []; // Định nghĩa myObject là một mảng các đối tượng Item

  let { user } = useQuanLyNguoiDungSelector();
  let countRoomOrder;

  const userInfo = user?.user?.id;

  if (userInfo) {
    countRoomOrder = 0;
    let { data: reserListData, refetch: refetchOrderList } = useQuery({
      queryKey: ["GetDatPhongByUser", userInfo],
      queryFn: () => datphongServices.getDetailReservationByUser(userInfo),
    });

    useEffect(() => {
      if (isAddReservation == true) {
        refetchOrderList();
      }
    }, [isAddReservation, refetchOrderList]);
    // Kiểm tra và chuyển đổi kiểu cho reserListData2
    const reserListData2 = reserListData?.data?.content as
      | Record<string, any>
      | undefined;
    if (reserListData2) {
      // Kiểm tra xem reserListData2 có tồn tại hay không
      for (const key in reserListData2) {
        for (const innerKey in reserListData2[key]) {
          if (innerKey === "maPhong") {
            let temp = reserListData2[key][innerKey];
            if (Number(temp) === Number(id)) {
              itemFound = true;
              break;
            }
          }
        }
        if (itemFound) {
          countRoomOrder = countRoomOrder + 1;
          myObject.push(reserListData2[key]); // Thêm đối tượng vào mảng
          itemFound = false;
        }
      }
    }
  }

  const { data: roomListData } = useQuery({
    queryKey: ["DetailRoom", id],
    queryFn: () => phongServices.getDetailRoom(id),
  });

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ReservationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(ReservationSchema),
  });

  const room = roomListData?.data?.content;

  if (!room) return <div>Loading...</div>;

  const handleEdit = (items: Reservation) => {
    setValue("id", items.id);
    setValue("maPhong", items.maPhong);
    setValue("ngayDen", moment(items.ngayDen).format("DD/MM/YYYY"));
    setValue("ngayDi", moment(items.ngayDi).format("DD/MM/YYYY"));
    setValue("soLuongKhach", items.soLuongKhach);
    setValue("maNguoiDung", items.maNguoiDung);
  };

  // onSubmit chỉ đc gọi khi validation ko có errors
  const onSubmit: SubmitHandler<ReservationSchemaType> = async (values) => {
    let bookingDetail;
    if (!isEditReservation) {
      bookingDetail = {
        ...values,
        id: values.id,
        maNguoiDung: Number(userInfo),
        maPhong: Number(room?.id),
        ngayDen: moment(values.ngayDen, "DD/MM/YYYY").toISOString(),
        ngayDi: moment(values.ngayDi, "DD/MM/YYYY").toISOString(),
      };
      addReservationMutation.mutate(bookingDetail);
    } else if (isEditReservation) {
      bookingDetail = {
        ...values,
        id: values.id,
        maNguoiDung: Number(userInfo),
        maPhong: Number(room?.id),
        ngayDen: moment(values.ngayDen, "DD/MM/YYYY").toISOString(),
        ngayDi: moment(values.ngayDi, "DD/MM/YYYY").toISOString(),
      };
      dispatch(quanLyDatPhongActions.setIsEditReservation(false));
      updateReservationMutation.mutate(bookingDetail);
    }
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
      {userInfo && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={16}>
                <Paragraph>
                  <strong style={{ fontWeight: "600" }}>{room.giuong}</strong>{" "}
                  giường &middot; <strong>{room.phongTam}</strong> phòng tắm
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
                        <Input
                          className="mb-[20px]"
                          {...field}
                          status={errors.ngayDen && "error"} // Hiển thị lỗi nếu có
                          placeholder="dd/mm/yyyy"
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
                        <Input
                          className="mb-[20px]"
                          {...field}
                          status={errors.ngayDi && "error"} // Hiển thị lỗi nếu có
                          placeholder="dd/mm/yyyy"
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

                  {!isEditReservation ? (
                    <Button
                      htmlType="submit"
                      loading={addReservationMutation.isPending}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Đặt phòng
                    </Button>
                  ) : (
                    <>
                      <Button
                        htmlType="submit"
                        loading={updateReservationMutation.isPending}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded w-20"
                        onClick={async () => {
                          const path = generatePath(PATH.DetailRoom, {
                            id: room?.id,
                          });
                          await sleep(2000);
                          navigate(path);
                        }}
                      >
                        Cập nhật
                      </Button>

                      <Button
                        htmlType="submit"
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          reset();
                          dispatch(
                            quanLyDatPhongActions.setIsEditReservation(false)
                          );
                        }}
                      >
                        Hủy
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="pt-4 cursor-default" gutter={[16, 16]}>
              <Col span={16}></Col>
              <Col span={8}>
                {userInfo && (
                  <>
                    {myObject && (
                      <>
                        <h2>
                          Danh sách đã đăng ký: {countRoomOrder || 0} phòng đã
                          được đăng ký
                        </h2>
                        <Row gutter={16}>
                          {myObject.map((roomOrder, index) => (
                            <Row className="p-1" key={index}>
                              <Col span={8}>
                                <Card style={{ width: 240 }}>
                                  {`Phòng ${index + 1}`}
                                  <Meta
                                    description={`Từ: ${moment(
                                      roomOrder.ngayDen
                                    ).format("DD/MM/YYYY")} `}
                                  />
                                  <Meta
                                    description={`Đến: ${moment(
                                      roomOrder.ngayDi
                                    ).format("DD/MM/YYYY")}`}
                                  />
                                  <Button
                                    className="btn btn-danger bg-blue-500 mt-2 w-20 text-white rounded-lg hover:bg-blue-600 transition-all"
                                    onClick={() => {
                                      deleteReservationMutation.mutate(
                                        roomOrder
                                      );
                                    }}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    className="btn btn-info ms-3 pl-2 pr-1 w-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                                    onClick={() => {
                                      clearErrors();
                                      handleEdit(roomOrder); // Truyền trực tiếp item vào hàm onEdit
                                      dispatch(
                                        quanLyDatPhongActions.setIsEditReservation(
                                          true
                                        )
                                      );
                                      const path = generatePath(
                                        PATH.DetailRoom,
                                        {
                                          id: room?.id,
                                        }
                                      );

                                      navigate(path);
                                    }}
                                  >
                                    Edit
                                  </Button>
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
          </form>
        </>
      )}
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
          <h1 className="text-[20px] font-bold my-[5px] mx-[10px]">
            Bình luận
          </h1>
          <div
            className="px-[20px] py-[20px] bg-gray-200"
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
