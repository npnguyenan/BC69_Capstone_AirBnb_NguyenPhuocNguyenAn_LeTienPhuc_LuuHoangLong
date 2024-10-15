import { useState } from "react";
import { Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from "/images/logo.png";
import userlogo from "/images/userlogo.jpg";
import { SignupTemplate, LoginTemplate } from "../templates";

export const Navbar = () => {
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

  const menuUser = (
    <Menu>
      <Menu.Item key="login" onClick={() => setLog(true)}>
        Đăng nhập
      </Menu.Item>
      <Menu.Item key="signup" onClick={() => setSign(true)}>
        Đăng ký
      </Menu.Item>
    </Menu>
  );

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
        className="flex items-center border border-spacing-1 rounded-full pl-1 pr-2 mt-2 sm:mt-0"
        style={{ marginLeft: "auto" }}
      >
        <Dropdown
          overlay={menuUser}
          trigger={["click"]}
          placement="bottomRight"
        >
          <MenuOutlined className="w-6 ms-3 h-5 cursor-pointer" />
        </Dropdown>
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
