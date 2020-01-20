import React from "react";
import Person from "./Person";

const Persons = ({ handleDelete, persons, filterText }) => {
  const filtered = persons.filter(person => {
    const name = person.name.toLowerCase();
    return name.includes(filterText.toLowerCase());
  });
  return (
    <ul>
      {filtered.map(person => (
        <Person handleDelete={handleDelete} key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
