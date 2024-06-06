import React, { useState, useEffect } from 'react';
import personService from './services/person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        setNotification({ message: 'Failed to fetch persons', type: 'error' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
          setNotification({ message: `Added ${newPerson.name}`, type: 'success' });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(error => {
          setNotification({ message: 'Failed to add person', type: 'error' });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const deletePerson = id => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setNotification({ message: 'Person deleted', type: 'success' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch(error => {
        setNotification({ message: 'Person was already removed from server', type: 'error' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
      <Notification notification={notification} />
      <Filter value={searchName} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons people={peopleToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;

