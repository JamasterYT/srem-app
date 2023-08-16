// Wiki.js
import React from "react";
import { Card, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import people from "../people.json";
import PersonCard from "./PersonCard"; // Correct import path
import { getAgeString, calculateAge } from "../utils";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Wiki = () => {
  const getGeneration = (currentGen, allPeople) => {
    let nextGen = [];
    
    currentGen.forEach((person) => {
      allPeople.forEach((potentialChild) => {
        if (
          (potentialChild.Ojciec === person.Id ||
            potentialChild.Matka === person.Id) &&
          !nextGen.includes(potentialChild) &&
          !currentGen.includes(potentialChild)
        ) {
          nextGen.push(potentialChild);
    
          // Check if the potential child has a spouse and add them too
          const spouse = allPeople.find(p => p.Id === potentialChild.Malzonek);
          if (spouse && !nextGen.includes(spouse) && !currentGen.includes(spouse)) {
            nextGen.push(spouse);
          }
        }
      });
    });
  
    // Sort the nextGen list by age before returning
    nextGen = nextGen.sort(sortByAge);
    
    return nextGen;
  };
  
  
  

  const sortByAge = (a, b) => {
    const ageA = calculateAge(a.Data_urodzenia);
    const ageB = calculateAge(b.Data_urodzenia);
    return ageB - ageA; // sortowanie w kolejności malejącej
  };
  
  const organizeByGenerations = (people) => {
    const generations = [];
    let currentGen = people
      .filter((person) => person.Id === 63 || person.Id === 64)
      .sort(sortByAge); // First generation
  
    while (currentGen.length > 0) {
      generations.push(currentGen);
      currentGen = getGeneration(currentGen, people).sort(sortByAge);
    }
  
    return generations;
  };
  

  const generations = organizeByGenerations(people);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {generations.map((generation, index) => (
        <React.Fragment key={index}>
          <Divider>Pokolenie {index + 1}</Divider>
          {generation.map((person) => (
            <PersonCard key={person.Id} person={person} />
          ))}
        </React.Fragment>
      ))}
      <Divider>
        <Link to="/">
          <ArrowLeftOutlined /> Powrót do strony głównej
        </Link>{" "}
      </Divider>
    </div>
  );
};

export default Wiki;
