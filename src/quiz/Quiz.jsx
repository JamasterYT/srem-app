import React, { useState, useEffect } from "react";
import { Button, Typography,Divider } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, TrophyOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Quiz = () => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Fetch the high score from localStorage when the component mounts
    const storedHighScore = localStorage.getItem("highScore") || 0;
    setHighScore(Number(storedHighScore));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title>Twój najwyższy wynik: {highScore}</Title>
      <Link to="/play-game">
        <Button type="primary" size="large">
        <TrophyOutlined /> Zagraj
        </Button>
      </Link>
      <Divider>
        <Link to="/">
          <ArrowLeftOutlined /> Powrót do strony głównej
        </Link>{" "}
      </Divider>
    </div>
  );
};

export default Quiz;
