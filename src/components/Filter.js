import React from "react";

const Filter = ({handleInputFilter}) => {
  return (
    <div>
      filter shown with <input type="text" onChange={handleInputFilter} />
    </div>
  );
};

export default Filter;
