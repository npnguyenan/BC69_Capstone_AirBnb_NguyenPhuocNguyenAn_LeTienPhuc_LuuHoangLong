import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import logo from "/images/logo.png";
import { useAppDispatch } from "../../stores";
import {
  userActions,
  useQuanLyNguoiDungSelector,
} from "../../stores/quanLyNguoiDung";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { LoginTemplate, SignupTemplate } from "../templates";

export const Navbar = () => {
  const { user } = useQuanLyNguoiDungSelector();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  const handleOk = () => {
    setSign(false);
  };

  const handleCancelSign = () => {
    setSign(false);
  };

  const handleCancelLog = () => {
    setLog(false);
  };

  const [popUp, setPopUp] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between p-3 border-b border-gray-300">
      <img src={logo} alt="Logo" className="w-24 h-8 ml-2 sm:ml-10" />

      <div className="flex space-x-4 sm:space-x-6 ml-5 sm:ml-40 font-bold mt-2 sm:mt-0">
        <a
          href="https://www.airbnb.com/s/experiences"
          className="text-gray-800 hover:text-blue-600"
        >
          Experiences
        </a>
        <a
          href="https://www.airbnb.com/help/article/1542"
          className="text-gray-800 hover:text-blue-600"
        >
          Help Center
        </a>
        <a
          href="https://www.airbnb.com.vn/help/article/1542"
          className="text-gray-800 hover:text-blue-600"
        >
          Chat Support
        </a>
      </div>
      <div
        onClick={() => setPopUp(!popUp)}
        className="cursor-pointer  flex items-center border border-spacing-3 rounded-full pl-3 pr-2 h-18 hover:shadow-xl transition-shadow duration-300"
        style={{ marginLeft: "20em" }}
      >
        {popUp && (
          <div className="shadow-xl h-90 w-32 z-10 absolute bg-white mt-32 p-1 rounded-2xl">
            {!user ? (
              <>
                <h1
                  onClick={() => {
                    setSign(true);
                  }}
                  className="font-semibold text-sm"
                >
                  Sign up
                </h1>
                <hr className="mt-2" />
                <h1
                  onClick={() => {
                    setLog(true);
                  }}
                  className="font-thin text-sm"
                >
                  Login
                </h1>
              </>
            ) : (
              <div className="py-10">
                <h1
                  onClick={() => {
                    navigate(PATH.info);
                  }}
                  className="font-thin text-sm"
                >
                  Thông tin tài khoản
                </h1>
                {user?.user?.role == "ADMIN" ? (
                  <h1
                    onClick={() => {
                      navigate(PATH.user);
                    }}
                    className="font-thin text-sm"
                  >
                    Quản lý người dùng
                  </h1>
                ) : (
                  <></>
                )}

                <h1
                  onClick={() => {
                    dispatch(userActions.logOut());
                    navigate("/");
                  }}
                  className="font-thin text-sm"
                >
                  Logout
                </h1>
              </div>
            )}
          </div>
        )}
        <MenuOutlined className="w-5 h-5 cursor-pointer" />
        <div className="relative w-9 h-9 overflow-hidden rounded-full border-4 border-white ml-2">
          <img
            src={user?.user?.avatar}
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