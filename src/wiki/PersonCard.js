import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { getAgeString, calculateAge } from "../utils";
import people from "../people.json";
const PersonCard = ({ person }) => {
  let description;

  if (person.Czy_nienarodzone) {
    description = "Nienarodzone";
  } else if (person.Czy_zyje) {
    description = getAgeString(calculateAge(person.Data_urodzenia));
  } else {
    description = `Ś. P. ${person.Data_urodzenia}`;
  }

  const fullName = person.Imie
    ? `${person.Imie} ${person.Nazwisko}`
    : `${person.Nazwisko}`;

  return (
    <Link to={`/wiki/${person.Id}`}>
      <Card
        hoverable
        style={{ width: 240, margin: "10px" }}
        cover={
          <img
            alt={fullName}
            src={`../photos/${person.Zdjecie}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../photos/blank.jpg";
            }}
          />
        }
        // data-aos="fade-up"
        data-aos="flip-down"
        data-aos-mirror
      >
        <Card.Meta title={fullName} description={description} />
      </Card>
    </Link>
  );
};

export default PersonCard;