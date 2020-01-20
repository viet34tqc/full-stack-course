import React from "react";

const Person = ({ handleDelete, person }) => {
  return (
    <li>
      {person.name} - {person.phone}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </li>
  );
};

export default Person;
