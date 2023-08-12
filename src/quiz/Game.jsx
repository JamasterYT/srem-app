import React, { useState, useEffect } from "react";
import { Card, Button, message, Typography, Row, Col } from "antd"; // Import Row and Col
import people from "../people.json";

const { Title } = Typography;

const Game = () => {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1); // Added state for question number

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    const validPeople = people.filter(
      person => person.Zdjecie !== "nienarodzone.jpg" && person.Imie !== null
    );
    const randomPerson = validPeople[Math.floor(Math.random() * validPeople.length)];
    setCurrentPerson(randomPerson);

    // Generate three random options and include the correct answer
    const randomOptions = [randomPerson];
    const usedNames = [randomPerson.Imie]; // To track used names

    while (randomOptions.length < 4) {
      const randomOption = validPeople[Math.floor(Math.random() * validPeople.length)];
      if (!usedNames.includes(randomOption.Imie)) {
        randomOptions.push(randomOption);
        usedNames.push(randomOption.Imie);
      }
    }
    // Shuffle the options
    setOptions(randomOptions.sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (person) => {
    if (person === currentPerson) {
      message.success("Correct!");
      setScore(score + 1);
      setQuestionNumber(questionNumber + 1); // Increment the question number
      nextQuestion();
    } else {
      message.error("Incorrect!");
      // Save the score to localStorage if it's higher than the previous high score
      const highScore = localStorage.getItem("highScore") || 0;
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
      // Redirect to the quiz page
      window.location.href = "#/quiz";
    }
  };

  return (
    <div style={{ padding: '0 16px 16px 16px' }}>

      {currentPerson && (
        <div>
          <Title level={3}>Pytanie {questionNumber}</Title>
          <Row justify="center" style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
              <img 
            src={`${process.env.PUBLIC_URL}/photos/${currentPerson.Zdjecie}`} 
            alt={currentPerson.Imie} 
            style={{ 
            width: '100%', 
            marginBottom: '16px', 
            borderRadius: '16px'  // This gives the image rounded corners
            }}
          />
            </Col>

          </Row>
          <Row gutter={[16, 16]} justify="center">
            {options.map((person, index) => (
              <Col xs={12} sm={12} md={6} key={index}> {/* Adjusted the xs prop value to 12 */}
                <Button 
                  
                  style={{ width: '100%', height: '100px' }} // Adjusted height to make it square-ish
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
