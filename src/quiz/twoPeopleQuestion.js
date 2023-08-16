//src/quiz/twoPeopleQuestion.js
import people from "../people.json";

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

export const generateTwoPeopleQuestion = () => {
  const validPeople = people.filter(
    (person) =>
      person.Imie &&
      person.Data_urodzenia &&
      !person.Czy_nienarodzone &&
      person.Czy_zyje === 1
  );

  const chosenMonth = Math.floor(Math.random() * 12);
  const peopleInChosenMonth = validPeople.filter(
    (person) =>
      parseInt(person.Data_urodzenia.split(".")[1], 10) - 1 === chosenMonth
  );

  if (peopleInChosenMonth.length < 2) {
    return generateTwoPeopleQuestion(); // Recursive call if not enough people for that month
  }

  let firstPersonIndex = Math.floor(Math.random() * peopleInChosenMonth.length);
  let secondPersonIndex;
  do {
    secondPersonIndex = Math.floor(Math.random() * peopleInChosenMonth.length);
  } while (firstPersonIndex === secondPersonIndex);

  const selectedPeople = [
    peopleInChosenMonth[firstPersonIndex],
    peopleInChosenMonth[secondPersonIndex],
  ];

  const randomMonth =
    Math.random() > 0.5
      ? months[chosenMonth]
      : months.find((_, index) => index !== chosenMonth);

  return {
    selectedPeople,
    randomMonth,
  };
};

export const checkTwoPeopleAnswer = (currentPeople, questionMonth) => {
  const firstPersonBirthMonth =
    parseInt(currentPeople[0].Data_urodzenia.split(".")[1], 10) - 1;
  const secondPersonBirthMonth =
    parseInt(currentPeople[1].Data_urodzenia.split(".")[1], 10) - 1;

  if (firstPersonBirthMonth !== secondPersonBirthMonth) {
    // Jeśli osoby są z różnych miesięcy, coś poszło nie tak.
    throw new Error("Osoby są z różnych miesięcy");
  }

  // Jeśli obie osoby są z tego samego miesiąca i ten miesiąc zgadza się z questionMonth, to odpowiedź to "Prawda". W przeciwnym razie odpowiedź to "Fałsz".
  return months[firstPersonBirthMonth] === questionMonth;
};
