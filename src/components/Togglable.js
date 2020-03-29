import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // toggleVisibility khi khai báo thế này thì sẽ sử dụng được ở parent component.
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility // toggleVisibility: toggleVisibility
    };
  });

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
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
