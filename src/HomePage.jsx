import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DatabaseOutlined, TrophyOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <Row style={{ height: '100vh' }}>
      <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/quiz">
          <Button 
            type="default" 
            size="large" 
            style={{ 
              width: '80vw', 
              maxWidth: '400px',  // Set a maximum width
              height: '40vh', 
              maxHeight: '200px',  // Set a maximum height
              fontSize: '3em'
            }}
          >
            <TrophyOutlined /> Quiz
          </Button>
        </Link>
      </Col>
      <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/wiki">
          <Button 
            type="default" 
            size="large" 
            style={{ 
              width: '80vw', 
              maxWidth: '400px',  // Set a maximum width
              height: '40vh', 
              maxHeight: '200px',  // Set a maximum height
              fontSize: '3em'
            }}
          >
            <DatabaseOutlined /> Wiki
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default HomePage;
