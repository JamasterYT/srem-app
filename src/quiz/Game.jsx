import React, { useState, useEffect } from "react";
import { Card, Button, message, Typography } from "antd";
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
    <div>
      {currentPerson && (
        <div>
          <Title level={3}>Pytanie {questionNumber}</Title> {/* Display the question number */}
          <img src={`${process.env.PUBLIC_URL}/photos/${currentPerson.Zdjecie}`} alt={currentPerson.Imie} />
          <div>
            {options.map((person, index) => (
              <Button  data-aos="flip-down" key={index} onClick={() => handleOptionClick(person)}>
                {person.Imie}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
