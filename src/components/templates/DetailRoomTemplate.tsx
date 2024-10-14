import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { phongServices } from "../../services";
import { Row, Col, Card, Typography } from "antd";
import { CommentByRoomTemplate } from "./CommentByRoomTemplate";

const { Title, Paragraph } = Typography;

export const DetailRoomTemplate = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["DetailRoom", id],
    queryFn: () => phongServices.getDetailRoom(id),
  });

  const room = data?.data?.content;
  console.log("room: ", room);

  if (!room) return <div>Loading...</div>;

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
        <Col span={16}>
          <Paragraph>
            <strong style={{ fontWeight: "600" }}>{room.giuong}</strong> giường
            &middot; <strong>{room.phongTam}</strong> phòng tắm
          </Paragraph>
          <Paragraph>{room.moTa}</Paragraph>
        </Col>
        <Col span={8}>
          <Card
            bordered
            style={{
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.169)",
            }}
          >
            <Title level={3}>
              Giá: {room.giaTien.toLocaleString("vi-VN")} VND / đêm
            </Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={24}>
          <Title level={4} style={{ fontWeight: "bold" }}>
            Tiện nghi phòng
          </Title>
          <Row gutter={[16, 16]} style={{ textAlign: "left" }}>
            <Col span={12}>
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
            <Col span={12}>
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
