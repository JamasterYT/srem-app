import React, { useState, useEffect } from "react";
import { Button, Typography, message, Row, Col } from "antd";
import {
  generateTwoPeopleQuestion,
  checkTwoPeopleAnswer,
} from "./twoPeopleQuestion";

const { Title, Text } = Typography;

const TrueFalse = () => {
  const [currentPeople, setCurrentPeople] = useState([]);
  const [questionMonth, setQuestionMonth] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    const { selectedPeople, randomMonth } = generateTwoPeopleQuestion();
    setCurrentPeople(selectedPeople);
    setQuestionMonth(randomMonth);
  };

  const handleAnswer = (answer) => {
    if (checkTwoPeopleAnswer(currentPeople, questionMonth) === answer) {
      message.success("Brawo!");
      const tfHighScore = parseInt(localStorage.getItem("tfHighScore") || "0");
      if (questionNumber > tfHighScore) {
        localStorage.setItem("tfHighScore", questionNumber.toString());
      }
      setQuestionNumber(questionNumber + 1);
      nextQuestion();
    } else {
      message.error("Przegrałeś!");
      window.location.href = "#/quiz";
    }
  };

  return (
    <div style={{ padding: "20px 20px 20px 20px", background: "#f7f7f7" }}>
      {currentPeople.length === 2 && (
        <div
          style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
        >
          <Title level={3}>Pytanie {questionNumber}</Title>
          <Text
            strong
            style={{ fontSize: "18px", display: "block", marginBottom: "20px" }}
          >
            {currentPeople[0].Imie} {currentPeople[0].Nazwisko} i{" "}
            {currentPeople[1].Imie} {currentPeople[1].Nazwisko} urodzili się w{" "}
            {questionMonth}.
          </Text>

          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12}>
              <Button
                type="default"
                size="large"
                onClick={() => handleAnswer(true)}
                style={{
                  width: "100%",
                  height: "100px",
                  borderColor: "#52c41a", // Zielony obramowanie dla przycisku "Prawda"
                  borderWidth: "2px", // Grubość obramowania
                }}
              >
                Prawda
              </Button>
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="default"
                size="large"
                onClick={() => handleAnswer(false)}
                style={{
                  width: "100%",
                  height: "100px",
                  borderColor: "#f5222d", // Czerwone obramowanie dla przycisku "Fałsz"
                  borderWidth: "2px",
                }}
              >
                Fałsz
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default TrueFalse;
