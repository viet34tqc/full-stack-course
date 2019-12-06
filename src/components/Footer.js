import React from "react";

const Footer = ({ parts }) => {
  const total = parts.reduce((current, part) => {
    return current + part.exercises;
  }, 0);

  return <div><strong>total of {total} exercises</strong></div>;
};

export default Footer;
