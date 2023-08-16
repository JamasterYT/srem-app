// src\quiz\Game.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, message, Typography, Row, Col, Badge } from "antd";
import people from "../people.json";

const { Title } = Typography;

const Game = () => {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [remainingPeople, setRemainingPeople] = useState([...people]);

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    const validPeople = remainingPeople.filter(
      (person) => person.Zdjecie !== "nienarodzone.jpg" && person.Imie !== null
    );
    const randomPerson =
      validPeople[Math.floor(Math.random() * validPeople.length)];
    setCurrentPerson(randomPerson);

    setRemainingPeople((prevPeople) =>
      prevPeople.filter((person) => person.Id !== randomPerson.Id)
    );

    const genderFilteredPeople = validPeople.filter(
      (person) => person.Plec === randomPerson.Plec
    );
    const randomOptions = [randomPerson];
    const usedNames = [randomPerson.Imie];

    while (randomOptions.length < 4) {
      const randomOption =
        genderFilteredPeople[
          Math.floor(Math.random() * genderFilteredPeople.length)
        ];
      if (!usedNames.includes(randomOption.Imie)) {
        randomOptions.push(randomOption);
        usedNames.push(randomOption.Imie);
      }
    }
    setOptions(randomOptions.sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (person) => {
    if (person === currentPerson) {
      message.success("Brawo!");
      const newScore = score + 1;
      setScore(newScore);
      setQuestionNumber(questionNumber + 1);
      const nameHighScore = localStorage.getItem("nameHighScore") || 0;
      if (newScore > nameHighScore) {
        localStorage.setItem("nameHighScore", newScore);
      }
      nextQuestion();
    } else {
      message.error(`Przegrałeś, twój wynik: ${score}`);
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
          <Row gutter={[16, 16]} justify="center">
            {options.map((person, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <Button
                  style={{ width: "100%", height: "100px" }}
                  onClick={() => handleOptionClick(person)}
                >
                  {person.Imie}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Game;
