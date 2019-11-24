import React from "react";
import ReactDOM from "react-dom";

const Header = props => <h1>{props.course}</h1>;
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part part={part.name} exercises={part.exercises} />;
      })}
    </div>
  );
};

const Footer = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts[0].exercises + parts[1].exercises + parts[2].exercises}
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
