import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons'; 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [searchName, setSearchName] = useState('');

  const addPerson = (name, number) => {
    if (persons.some(person => person.name === name)) {
      alert(`${name} is already taken`);
    } else {
      const personObject = {
        name: name,
        number: number,
        id: persons.length + 1,
      };
      setPersons([...persons, personObject]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const peopleToShow = searchName
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2> 
      <Persons people={peopleToShow} />
    </div>
  );
};

export default App;