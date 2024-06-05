import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons'; 

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'Persons')

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