import { useState } from "react";
import { Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { SignupComponent } from "./SignupComponent";
import LoginComponent from "./LoginComponent";
import search from "../images/search.jpg";
import logo from "../images/logo.png";
import user from "../images/user.jpg";
import { viTriServices } from "../services";
import { useQuery } from "@tanstack/react-query";

export const Navbar = () => {
  const { data: dataLocation } = useQuery({
    queryKey: ["ListLocation"],
    queryFn: () => viTriServices.getLocation(),
  });

  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);
  const [placeInput, setPlaceInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOk = () => {
    setSign(false);
  };

  const handleCancelSign = () => {
    setSign(false);
  };

  const handleCancelLog = () => {
    setLog(false);
  };

  const handlePlaceInputClick = () => {
    setShowDropdown(true);
  };

  const handlePlaceSelect = (tinhThanh: any) => {
    setPlaceInput(tinhThanh);
    setShowDropdown(false);
  };

  const menu = (
    <div className="absolute z-10 bg-white border rounded-lg shadow-lg p-4 w-80">
      <div className="grid grid-cols-4 gap-2">
        {dataLocation?.data?.content.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer py-2 px-1 text-center hover:bg-gray-200 rounded"
            onClick={() => handlePlaceSelect(item.tinhThanh)}
          >
            {item.tinhThanh}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-center p-3 border border-b-gray-300">
      <img src={logo} alt="Logo" className="w-24 h-8 ml-10" />
      <div
        className="p-2 h-12 flex items-center border border-gray-300 rounded-3xl shadow-lg"
        style={{ marginLeft: "30em" }}
      >
        <div className="relative w-24">
          <input
            type="text"
            className="text-gray-900 text-sm block w-full p-2.5 rounded-3xl outline-none"
            placeholder="Add place"
            value={placeInput}
            onClick={handlePlaceInputClick}
            readOnly
          />
          {showDropdown && menu}
        </div>

        <input
          type="text"
          className="text-gray-900 text-sm block w-24 p-2.5 rounded-3xl outline-none"
          placeholder="Add Date"
          required
        />
        <input
          type="text"
          className="text-gray-900 text-sm block w-24 p-2.5 rounded-3xl outline-none"
          placeholder="Add Guests"
          required
        />
        <div className="relative w-10 h-10 overflow-hidden rounded-full border-4 border-white">
          <img src={search} className="object-cover w-full h-full" />
        </div>
      </div>

      <div
        className="flex items-center border border-spacing-1 rounded-full pl-1 pr-2"
        style={{ marginLeft: "20em" }}
      >
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <MenuOutlined className="w-5 h-5 cursor-pointer" />
        </Dropdown>
        <div className="relative w-9 h-9 overflow-hidden rounded-full border-4 border-white ml-2">
          <img src={user} alt="user" className="object-cover w-full h-full" />
        </div>
      </div>
      {sign && (
        <SignupComponent
          sign={sign}
          onOk={handleOk}
          onCancel={handleCancelSign}
        />
      )}
      {log && (
        <LoginComponent log={log} onOk={handleOk} onCancel={handleCancelLog} />
      )}
    </div>
  );
};
