// src/HomePage.tsx
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/wiki">
        <Button type="primary" style={{ margin: "10px" }}>
          Wiki
        </Button>
      </Link>
      <Link to="/quiz">
        <Button type="primary" style={{ margin: "10px" }}>
          Quiz
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;