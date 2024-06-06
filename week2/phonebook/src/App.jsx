import React, { useState, useEffect } from 'react';
import personService from './services/person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (name, number) => {
    if (persons.some(person => person.name === name)) {
      alert(`${name} is already taken`);
    } else {
      const personObject = {
        name: name,
        number: number,
      };

      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
        });
    }
  };

  const deletePerson = id => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert('The person was already removed from the server');
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  const handleSearchChange = event => {
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
      <Persons people={peopleToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
