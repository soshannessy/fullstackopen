import React from "react";

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;