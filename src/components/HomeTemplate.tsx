import { useQuery } from "@tanstack/react-query";
import { Button, Card, Skeleton } from "antd";
import { generatePath, useNavigate } from "react-router-dom";
import { phongServices, viTriServices } from "../services";
import { PATH } from "../constants";
import { useState } from "react";
import search from "../images/search.jpg";
import { sleep } from "../utils";

export const HomeTemplate = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["DanhSachPhong"],
    queryFn: async () => {
      await sleep();
      return phongServices.getRoom();
    },
  });

  const { data: dataLocation } = useQuery({
    queryKey: ["ListLocation"],
    queryFn: () => viTriServices.getLocation(),
  });

  const [placeInput, setPlaceInput] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePlaceInputClick = () => {
    setShowDropdown(true);
  };

  const handlePlaceSelect = (location: any) => {
    setPlaceInput(location.tinhThanh);
    setSelectedLocationId(location.id);
    setShowDropdown(false);
  };

  const limitedLocations = dataLocation?.data?.content.slice(0, 8) || [];

  const menuPlace = (
    <div className="absolute z-10 bg-white border rounded-lg shadow-lg p-4 w-full max-w-sm mt-1">
      <div className="grid grid-cols-2 gap-2">
        {limitedLocations.map((item) => (
          <div
            key={item.id}
            className="flex items-center cursor-pointer py-2 px-1 hover:bg-gray-200 rounded"
            onClick={() => handlePlaceSelect(item)}
          >
            <img
              src={item.hinhAnh}
              alt={item.tinhThanh}
              className="w-12 h-12 rounded-full mr-2"
            />
            {item.tinhThanh}
          </div>
        ))}
      </div>
    </div>
  );

  const filteredRooms = selectedLocationId
    ? data?.data.content.filter(
        (room) => room.maViTri === selectedLocationId
      ) || []
    : data?.data.content || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-center sm:justify-end mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end w-full sm:w-auto rounded-full border-2 border-blue-200 relative sm:space-y-0">
          <div className="w-full sm:w-64">
            <input
              type="text"
              className="text-gray-900 text-center block w-full rounded-3xl outline-none border-none p-3 transition-opacity duration-200 hover:bg-slate-200"
              placeholder="Add Place"
              value={placeInput}
              onClick={handlePlaceInputClick}
              readOnly
            />
            {showDropdown && menuPlace}
          </div>
          <input
            type="text"
            className="text-gray-900 text-center block w-full sm:w-32 rounded-3xl outline-none border-none p-3 transition-opacity duration-200 hover:bg-slate-200"
            placeholder="Add Date"
            required
          />
          <input
            type="text"
            className="text-gray-900 text-center block w-full sm:w-32 rounded-3xl outline-none border-none p-3 transition-opacity duration-200 hover:bg-slate-200"
            placeholder="Add Guests"
            required
          />
          <div className="w-10 h-10 overflow-hidden rounded-full border-4 border-white flex justify-center items-center">
            <img
              src={search}
              className="object-cover w-full h-full"
              alt="Search"
            />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Danh Sách Phòng</h1>

      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div className="bg-white shadow-md rounded-lg relative" key={index}>
              <Skeleton.Input
                active
                className="w-full h-48"
                style={{ width: "180%", height: "200px" }}
              />
              <div className="p-9">
                <Skeleton.Input active style={{ width: "120%" }} />
                <Skeleton.Input active style={{ width: "120%" }} />
                <Skeleton.Input
                  active
                  style={{ width: "120%" }}
                  className="mb-3"
                />
                <Skeleton.Button
                  active
                  className="absolute bottom-2 right-4 mt-10"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative"
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={room.tenPhong}
                    src={room.hinhAnh}
                    className="w-full h-48 object-cover"
                  />
                }
                className="border-none h-full"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{room.tenPhong}</h3>
                  <p className="text-gray-500 mt-2">
                    Giá: {room.giaTien.toLocaleString()} $/đêm
                  </p>
                </div>
                <Button
                  onClick={() => {
                    const path = generatePath(PATH.DetailRoom, {
                      id: room.id,
                    });
                    navigate(path);
                  }}
                  className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Đặt ngay
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
