//src\quiz\Quiz.jsx
import React from "react";
import { Card, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const Quiz = () => {
  return <div>Tutaj będzie quiz!
    <Divider>
        <Link to="/srem-app">
          <ArrowLeftOutlined /> Powrót do strony głównej
        </Link>{" "}
      </Divider>
  </div>;
};

export default Quiz;