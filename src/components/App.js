import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import contacts from "../services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    contacts.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  const duplicatePerson = () => {
    const duplicate = persons.find((person, index) => {
      return person.name === newName; // không dùng indexof vì có name A có thể nằm trong name B
    });
    if (duplicate) {
      return duplicate;
    }
    return false;
  };

  const addPerson = e => {
    e.preventDefault();
    const duplicate = duplicatePerson();
    if (duplicate) {
      const isUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one`
      );
      if (isUpdate) {
        const updatedContact = {
          id: duplicate.id,
          name: duplicate.name,
          phone: newPhone
        };
        contacts
          .update(duplicate.id, updatedContact)
          .then(person => handleAfterUpdate(person));
        return;
      }
      return;
    }
    const newPerson = {
      name: newName,
      phone: newPhone
    };
    contacts.create(newPerson).then(person => {
      handleAfterCreate(person);
    });
  };

  const handleAfterCreate = person => {
    setPersons([...persons, person]);
    setNewName("");
    setNewPhone("");
  };

  const handleAfterUpdate = changedPerson => {
    setPersons(
      persons.map(person =>
        person.id !== changedPerson.id ? person : changedPerson
      )
    );
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
    setFilterText(value);
  };

  const handleDelete = id => {
    contacts.del(id).then(() => {
      const newPersons = persons.filter(person => person.id !== id);
      setPersons(newPersons);
    });
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
      <Persons
        persons={persons}
        filterText={filterText}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
