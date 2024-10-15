import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import LoginTemplate from "../templates/LoginTemplate";
import search from "../../images/search.jpg";
import airbnblogo from "../../images/airbnblogo.png";
import userlogo from "../../images/userlogo.jpg";
import { viTriServices } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../stores";
import {
  quanLyDangNhapActions,
  quanLyDangNhapSelector,
} from "../../stores/quanLyDangNhap";
import SignupTemplate from "../templates/SignupTemplate";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = quanLyDangNhapSelector();
  const dispatch = useAppDispatch();
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

  const [popUp, setPopUp] = useState(false);

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
      <img
        src={airbnblogo}
        alt="Logo"
        className="w-24 h-8 ml-10 cursor-pointer"
        onClick={() => {
          {
            navigate("/");
          }
        }}
      />
      <div
        className="p-2 h-12 flex items-center border border-gray-300 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
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
        onClick={() => setPopUp(!popUp)}
        className="cursor-pointer flex items-center border border-spacing-3 rounded-full pl-3 pr-2 h-18 hover:shadow-xl transition-shadow duration-300"
        style={{ marginLeft: "20em" }}
      >
        {popUp && (
          <div className="shadow-xl h-16 w-32 z-10 absolute bg-white mt-32 p-1 rounded-2xl">
            {!user ? (
              <>
                <h1
                  onClick={() => {
                    setSign(true);
                  }}
                  className="font-semibold text-sm"
                >
                  Signup
                </h1>
                <hr className="mt-2" />
                <h1
                  onClick={() => {
                    setLog(true);
                  }}
                  className="font-thin text-sm"
                >
                  login
                </h1>
              </>
            ) : (
              <>
                <hr className="mt-2" />
                <h1
                  onClick={() => dispatch(quanLyDangNhapActions.logOut())}
                  className="font-thin text-sm"
                >
                  logout
                </h1>
              </>
            )}
          </div>
        )}
        <MenuOutlined className="w-5 h-5 cursor-pointer" />
        <div className="relative w-9 h-9 overflow-hidden rounded-full border-4 border-white ml-2">
          <img
            src={userlogo}
            alt="user"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {sign && (
        <SignupTemplate
          sign={sign}
          onOk={handleOk}
          onCancel={handleCancelSign}
        />
      )}
      {log && (
        <LoginTemplate log={log} onOk={handleOk} onCancel={handleCancelLog} />
      )}
    </div>
  );
};
