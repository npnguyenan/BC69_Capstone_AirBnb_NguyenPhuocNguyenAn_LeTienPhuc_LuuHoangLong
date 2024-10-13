import React, { useState } from "react";
import logo from "./logo.svg";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Button } from "antd";
import { SignupComponent } from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/Main";

function App() {
  // Tạo state isModalVisible và hàm showModal để hiển thị ModalComponent
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  const showModal = () => {
    setSign(!sign);
  };

  const handleOk = () => {
    setSign(sign);
    // Logic for signup process goes here
  };

  const handleCancelSign = () => {
    setSign(sign);
  };

  const handleCancelLog = () => {
    setLog(log);
  };

  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline text-red-700">
        Hello world!
      </h1> */}
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      {/* <Navbar /> */}
      {/* <Routes>
        <Route
          path="/signup"
          element={
            <SignupComponent
              sign={sign}
              onOk={handleOk}
              onCancel={handleCancelSign}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginComponent
              log={log}
              onOk={handleOk}
              onCancel={handleCancelLog}
            />
          }
        />
        <Route path="/" element={<Main />} />
      </Routes> */}
      <Main />
    </div>
  );
}

export default App;
