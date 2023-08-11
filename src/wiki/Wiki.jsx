// Wiki.js
import React from "react";
import { Card, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import people from "../people.json";
import PersonCard from "./PersonCard"; // Correct import path
import { getAgeString, calculateAge } from "../utils";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Wiki = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {people.map((person) => (
        <PersonCard
          // data-aos="flip-down"
          // data-aos-mirror
          key={person.Id}
          person={person}
        />
      ))}
      <Divider>
        <Link to="/">
          <ArrowLeftOutlined /> Powrót
        </Link>{" "}
        {/* Dodane */}
      </Divider>
    </div>
  );
};

export default Wiki;