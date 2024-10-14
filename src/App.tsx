import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/templates/MainTemplate";
import { SignupComponent } from "./components/templates/SignupTemplate";
import LoginComponent from "./components/templates/LoginTemplate";
import { HomeTemplate } from "./components";

function App() {
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomeTemplate />} />
        </Route>
        <Route
          path="/signup"
          element={
            <SignupComponent
              sign={sign}
              onOk={() => setSign(false)}
              onCancel={() => setSign(false)}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginComponent
              log={log}
              onOk={() => setLog(false)}
              onCancel={() => setLog(false)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
