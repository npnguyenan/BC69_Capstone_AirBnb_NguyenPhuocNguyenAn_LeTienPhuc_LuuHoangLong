import React, { useState } from "react";
import { Button } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { SignupComponent } from "./SignupComponent";
import LoginComponent from "./LoginComponent";
import { Routes, Route } from "react-router-dom";
import search from "../images/search.jpg";
import logo from "../images/logo.png";
import user from "../images/user.jpg";

export const Navbar = () => {
  // Tạo state isModalVisible và hàm showModal để hiển thị ModalComponent
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  const showModal = () => {
    setSign(true);
  };

  const handleOk = () => {
    setSign(false);
    // Logic for signup process goes here
  };

  const handleCancelSign = () => {
    setSign(false);
  };

  const handleCancelLog = () => {
    setLog(false);
  };

  return (
    <div className="flex items-center p-3 border border-b-gray-300">
      <img src={logo} alt="Logo" className="w-24 h-8 ml-10" />
      <div
        className=" p-2 h-12 flex items-center border border-gray-300 rounded-3xl shadow-lg"
        style={{ marginLeft: "30em" }}
      >
        <input
          type="text"
          id="first_name"
          className=" text-gray-900 text-sm block w-24 p-2.5 rounded-3xl outline-none"
          placeholder="Add place"
          required
        />
        <input
          type="text"
          id="first_name"
          className=" text-gray-900 text-sm block w-24 p-2.5 rounded-3xl outline-none"
          placeholder="Add Date"
          required
        />
        <input
          type="text"
          id="first_name"
          className=" text-gray-900 text-sm block w-24 p-2.5 rounded-3xl outline-none"
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
        <MenuOutlined className="w-5 h-5" />
        <div className="relative w-9 h-9 overflow-hidden rounded-full border-4 border-white ml-2">
          <img src={user} alt="user" className="object-cover w-full h-full" />
        </div>
        <Button
          type="primary"
          onClick={() => {
            setSign(true);
          }}
        >
          Login
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setLog(true);
          }}
        >
          signup
        </Button>
        {sign && (
          <SignupComponent
            sign={sign}
            onOk={handleOk}
            onCancel={handleCancelSign}
          />
        )}
        {log && (
          <LoginComponent
            log={log}
            onOk={handleOk}
            onCancel={handleCancelLog}
          />
        )}
      </div>
    </div>
  );
};
