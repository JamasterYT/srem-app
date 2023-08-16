//src/wiki/PersonCard.js
import React, { useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { getAgeString, calculateAge } from "../utils";
import people from "../people.json";

const PersonCard = ({ person }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

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
          imageLoaded && (
            <img
              alt={fullName}
              src={`${process.env.PUBLIC_URL}/photos/${person.Zdjecie}`}
              // src={`../photos/${person.Zdjecie}`}
              onLoad={() => setImageLoaded(true)}
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = "../photos/blank.jpg";
              // }}
              onError={() => {
                setImageLoaded(false);
              }}
            />
          )
        }
        // data-aos="fade-up"
        data-aos="flip-down"
        data-aos-once="false"
        data-aos-mirror
      >
        <Card.Meta title={fullName} description={description} />
      </Card>
    </Link>
  );
};

export default PersonCard;
