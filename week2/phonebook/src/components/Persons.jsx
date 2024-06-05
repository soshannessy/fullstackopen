import React from 'react';

const Persons = ({ people }) => {
  return (
    <ul>
      {people.map(person => 
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>
  );
};

export default Persons;

