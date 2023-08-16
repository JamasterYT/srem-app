import React, { useState, useEffect } from "react";
import { Button, Typography, message } from "antd";
import people from "../people.json";

const { Title, Text } = Typography;

const TrueFalse = () => {
  const [currentPeople, setCurrentPeople] = useState([]);
  const [questionMonth, setQuestionMonth] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const months = [
    "styczniu",
    "lutym",
    "marcu",
    "kwietniu",
    "maju",
    "czerwcu",
    "lipcu",
    "sierpniu",
    "wrześniu",
    "październiku",
    "listopadzie",
    "grudniu",
  ];

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    const validPeople = people.filter(
      (person) =>
        person.Imie &&
        person.Data_urodzenia &&
        !person.Czy_nienarodzone &&
        person.Czy_zyje === 1
    );

    // Wybieramy miesiąc
    const chosenMonth = Math.floor(Math.random() * 12);

    // Wybieramy dwie różne osoby, które urodziły się w tym miesiącu
    const peopleInChosenMonth = validPeople.filter(
      (person) =>
        parseInt(person.Data_urodzenia.split(".")[1], 10) - 1 === chosenMonth
    );

    if (peopleInChosenMonth.length < 2) {
      // Jeśli mniej niż dwie osoby urodziły się w tym miesiącu, to ponownie wybieraj pytanie
      nextQuestion();
      return;
    }

    let firstPersonIndex = Math.floor(
      Math.random() * peopleInChosenMonth.length
    );
    let secondPersonIndex;
    do {
      secondPersonIndex = Math.floor(
        Math.random() * peopleInChosenMonth.length
      );
    } while (firstPersonIndex === secondPersonIndex);

    const selectedPeople = [
      peopleInChosenMonth[firstPersonIndex],
      peopleInChosenMonth[secondPersonIndex],
    ];
    setCurrentPeople(selectedPeople);

    // 50% szans na prawdziwe pytanie i 50% na fałszywe
    if (Math.random() > 0.5) {
      setQuestionMonth(months[chosenMonth]);
    } else {
      const otherMonths = months.filter((_, index) => index !== chosenMonth);
      setQuestionMonth(
        otherMonths[Math.floor(Math.random() * otherMonths.length)]
      );
    }
  };

  const handleAnswer = (answer) => {
    const firstPersonBirthMonth =
      currentPeople[0].Data_urodzenia.split(".")[1] - 1;
    const secondPersonBirthMonth =
      currentPeople[1].Data_urodzenia.split(".")[1] - 1;

    const isFirstPersonCorrect =
      months[firstPersonBirthMonth] === questionMonth;
    const isSecondPersonCorrect =
      months[secondPersonBirthMonth] === questionMonth;

    if (
      (isFirstPersonCorrect && isSecondPersonCorrect && answer) ||
      (!isFirstPersonCorrect && !isSecondPersonCorrect && !answer)
    ) {
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
      {" "}
      {/* Zmiana tła dla lepszej czytelności */}
      {currentPeople.length === 2 && (
        <div
          style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
        >
          {" "}
          {/* Zastosuj białe tło do głównej zawartości */}
          <Title level={3}>Pytanie {questionNumber}</Title>
          <Text
            strong
            style={{ fontSize: "18px", display: "block", marginBottom: "20px" }}
          >
            {currentPeople[0].Imie} {currentPeople[0].Nazwisko} i{" "}
            {currentPeople[1].Imie} {currentPeople[1].Nazwisko} urodzili się w{" "}
            {questionMonth}.
          </Text>
          <div style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => handleAnswer(true)}
              style={{ marginRight: "10px" }}
            >
              Prawda
            </Button>
            <Button
              type="danger"
              size="large"
              onClick={() => handleAnswer(false)}
            >
              Fałsz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueFalse;
