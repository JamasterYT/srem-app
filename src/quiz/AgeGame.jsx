// src\quiz\AgeGame.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, message, Typography, Row, Col } from "antd";
import people from "../people.json";
import { calculateAge } from "../utils";

const { Title } = Typography;

const AgeGame = () => {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [options, setOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [remainingPeople, setRemainingPeople] = useState(
    people.filter(
      (person) => person.Data_urodzenia !== null && person.Czy_zyje === 1
    )
  );

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    if (remainingPeople.length === 0) {
      message.error("Koniec gry!");
      window.location.href = "#/quiz";
      return;
    }
    const randomPerson =
      remainingPeople[Math.floor(Math.random() * remainingPeople.length)];
    setCurrentPerson(randomPerson);
    setRemainingPeople((prevPeople) =>
      prevPeople.filter((person) => person.Id !== randomPerson.Id)
    );

    const correctAge = calculateAge(randomPerson.Data_urodzenia);
    const ageOptions = [correctAge];

    while (ageOptions.length < 4) {
      let randomAge =
        correctAge +
        (Math.floor(Math.random() * (questionNumber < 60 ? 30 : 5)) -
          (questionNumber < 60 ? 15 : 2));
      if (randomAge > 0 && !ageOptions.includes(randomAge)) {
        ageOptions.push(randomAge);
      }
    }

    setOptions(ageOptions.sort((a, b) => a - b)); // Sortowanie odpowiedzi w porządku rosnącym
  };

  const handleOptionClick = (age) => {
    if (age === calculateAge(currentPerson.Data_urodzenia)) {
      message.success("Brawo!");
      setQuestionNumber(questionNumber + 1);
      const ageHighScore = localStorage.getItem("ageHighScore") || 0;
      if (questionNumber > ageHighScore) {
        localStorage.setItem("ageHighScore", questionNumber);
      }
      nextQuestion();
    } else {
      message.error(
        `Przegrałeś, poprawna odpowiedź: ${calculateAge(
          currentPerson.Data_urodzenia
        )}`
      );
      window.location.href = "#/quiz";
    }
  };

  return (
    <div style={{ padding: "0 16px 16px 16px" }}>
      {currentPerson && (
        <div>
          <Title level={3}>Pytanie {questionNumber}</Title>
          <Row justify="center" style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={16} md={12} lg={8}>
              <img
                src={`${process.env.PUBLIC_URL}/photos/${currentPerson.Zdjecie}`}
                alt={currentPerson.Imie}
                style={{
                  width: "100%",
                  marginBottom: "16px",
                  borderRadius: "16px",
                }}
              />
            </Col>
          </Row>
          <Row justify="center" style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={16} md={12} lg={8}>
              <Typography.Text>
                Ile lat ma {currentPerson.Imie} {currentPerson.Nazwisko}?
              </Typography.Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]} justify="center">
            {options.map((age, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <Button
                  style={{ width: "100%", height: "100px" }}
                  onClick={() => handleOptionClick(age)}
                >
                  {age}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default AgeGame;
