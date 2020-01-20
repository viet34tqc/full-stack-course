import React from "react";

const PersonForm = ( { addPerson, handleInputText, newName, newPhone }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input onChange={e => handleInputText(e, "name")} value={newName} />
      </div>
      <div>
        number:{" "}
        <input onChange={e => handleInputText(e, "phone")} value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
