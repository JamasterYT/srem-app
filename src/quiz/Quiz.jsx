// src\quiz\Quiz.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Divider,
  Select,
  Avatar,
  Space,
  Row,
  Col,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import { StarOutlined, CrownOutlined } from "@ant-design/icons";

import {
  ArrowLeftOutlined,
  TrophyOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import people from "../people.json";
import { Badge } from "antd";

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const Quiz = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userLevel, setUserLevel] = useState("Nowicjusz");

  const tfHighScore = localStorage.getItem("tfHighScore") || 0;
  const ageHighScore = localStorage.getItem("ageHighScore") || 0;
  const nameHighScore = localStorage.getItem("nameHighScore") || 0;
  const totalScore =
    parseInt(tfHighScore) + parseInt(nameHighScore) + parseInt(ageHighScore);

  const determineUserLevel = (score) => {
    if (score <= 50) return "Nowicjusz";
    if (score <= 100) return "Średniozaawansowany";
    return "Ekspert";
  };

  useEffect(() => {
    const userId = localStorage.getItem("loggedUser");
    if (userId) {
      const user = people.find((person) => person.Id === Number(userId));
      setLoggedUser(user);
    }

    const level = determineUserLevel(totalScore);
    setUserLevel(level);
  }, []);

  const handleUserChange = (value) => {
    localStorage.setItem("loggedUser", value);
    const user = people.find((person) => person.Id === value);
    setLoggedUser(user);
  };

  const showLogoutConfirm = () => {
    confirm({
      title: "Czy na pewno chcesz się wylogować?",
      onOk: handleLogout,
      onCancel() {},
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("ageHighScore");
    localStorage.removeItem("tfHighScore");
    localStorage.removeItem("nameHighScore");
    localStorage.setItem("userLevel", "Nowicjusz");
    setUserLevel("Nowicjusz");
    setLoggedUser(null);
  };

  const eligiblePeople = people.filter(
    (person) => person.Czy_zyje && !person.Czy_nienarodzone
  );
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Row justify="center" gutter={[0, 24]}>
        {loggedUser ? (
          <>
            <Col>
              <Avatar
                src={`${process.env.PUBLIC_URL}/photos/${loggedUser.Zdjecie}`}
                size={100}
                onClick={showLogoutConfirm}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col>
              <Title
                level={3}
              >{`${loggedUser.Imie} ${loggedUser.Nazwisko}`}</Title>
            </Col>
            <Col>
              <Typography.Text>
                Łącznie punktów: {totalScore} ({userLevel})
              </Typography.Text>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <Typography.Title level={2}>
                Przedstaw się, aby zagrać
              </Typography.Title>
            </Col>
            <Col>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Znajdź siebie!"
                optionFilterProp="children"
                onChange={handleUserChange}
              >
                {eligiblePeople.map((person) => (
                  <Option key={person.Id} value={person.Id}>
                    {`${person.Imie} ${person.Nazwisko}`}
                  </Option>
                ))}
              </Select>
            </Col>
          </>
        )}
      </Row>
      {loggedUser && (
        <Space direction="vertical" size="large" style={{ marginTop: "30px" }}>
          <Link to="/play-game">
            <Button
              type="primary"
              size="large"
              icon={<QuestionCircleOutlined />}
            >
              Zgadnij kto to{" "}
              <Badge count={nameHighScore} style={{ marginLeft: "10px" }} />
            </Button>
          </Link>
          <Link to="/play-age-game">
            <Button type="primary" size="large" icon={<ClockCircleOutlined />}>
              Czas na odpowiedź
              {ageHighScore > 0 && (
                <Badge count={ageHighScore} style={{ marginLeft: "10px" }} />
              )}
            </Button>
          </Link>
          <Link to="/play-true-false-game">
            <Button type="primary" size="large" icon={<TrophyOutlined />}>
              Prawda czy fałsz
              <Badge
                count={localStorage.getItem("tfHighScore") || 0}
                style={{ marginLeft: "10px" }}
              />
            </Button>
          </Link>
        </Space>
      )}
      <Divider>
        <Link to="/">
          <ArrowLeftOutlined /> Powrót do strony głównej
        </Link>
      </Divider>
    </div>
  );
};

export default Quiz;
