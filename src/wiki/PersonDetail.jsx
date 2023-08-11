import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Divider, Button } from "antd";

import people from "../people.json";
import PersonCard from "./PersonCard"; // Correct import path
import { getAgeString, calculateAge } from "../utils";
import { ArrowLeftOutlined } from "@ant-design/icons";
const PersonDetail = () => {
  const { personId } = useParams();
  const person = people.find((p) => p.Id.toString() === personId);

  if (!person) return <div>Osoba nie znaleziona</div>;

  const spouse = person.Malzonek
    ? people.find((p) => p.Id === person.Malzonek)
    : null;

  const engagedTo = person.Narzeczenstwo
    ? people.find((p) => p.Id === person.Narzeczenstwo)
    : null;

  const inRelationshipWith = person.Zwiazek
    ? people.find((p) => p.Id === person.Zwiazek)
    : null;

  const children = people.filter(
    (p) => p.Ojciec === person.Id || p.Matka === person.Id
  );
  const father = person.Ojciec
    ? people.find((p) => p.Id === person.Ojciec)
    : null;
  const mother = person.Matka
    ? people.find((p) => p.Id === person.Matka)
    : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Divider>Rodzice</Divider>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {father && <PersonCard person={father} />}
        {mother && <PersonCard person={mother} />}
        <Divider>
          {person.Imie
            ? `${person.Imie} ${person.Nazwisko}`
            : `${person.Nazwisko}`}
        </Divider>

        <PersonCard person={person} />
        {spouse && <PersonCard person={spouse} />}
        {engagedTo && <PersonCard person={engagedTo} />}
        {inRelationshipWith && <PersonCard person={inRelationshipWith} />}
        {children.length > 0 && (
          <>
            <Divider>Dzieci</Divider>
            {children.map((child) => (
              <PersonCard key={child.Id} person={child} />
            ))}
          </>
        )}
      </div>
      <Divider>
        <Link to="/wiki">
          <ArrowLeftOutlined /> Powrót
        </Link>{" "}
        {/* Dodane */}
      </Divider>
    </div>
  );
};

export default PersonDetail;