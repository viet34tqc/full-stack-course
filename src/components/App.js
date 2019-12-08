import React, { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" }
  ]);
  const [filtered, setFiltered] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const isDuplicate = () => {
    const names = persons.map(person => person.name);
    return names.some(name => {
      return newName === name;
    });
  };

  const addPerson = e => {
    e.preventDefault();
    if (isDuplicate()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      phone: newPhone
    };
    setPersons([...persons, newPerson]);
    setFiltered([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
  };

  const handleInputText = (e, type) => {
    const value = e.target.value;
    if ("name" === type) {
      setNewName(value);
    } else {
      setNewPhone(value);
    }
  };

  const handleInputFilter = e => {
    const value = e.target.value;
    const filteredPersons = persons.filter(person => {
      const name = person.name.toLowerCase();
      return name.includes(value.toLowerCase());
    });
    setFiltered(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleInputFilter={handleInputFilter} />
      <PersonForm
        addPerson={addPerson}
        handleInputText={handleInputText}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} />
    </div>
  );
};

export default App;
