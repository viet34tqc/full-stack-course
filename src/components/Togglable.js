import React, { useState } from "react";

const Togglable = props => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  return (
    <div>
      <button style={hideWhenVisible} onClick={() => setVisible(true)}>
        {props.buttonLabel}
      </button>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
