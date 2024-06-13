import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage({ text: 'Error fetching data', type: 'error' });
        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if (nameExists) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personsService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setMessage({ text: '', type: '' });
          }, 5000);
        })
        .catch(error => {
          console.error('Error adding person:', error);
          setMessage({ text: 'Failed to add person.', type: 'error' });
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deletePerson = (id) => {
    personsService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setMessage({ text: 'Person deleted successfully', type: 'success' });
        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 5000);
      })
      .catch(error => {
        console.error('Error deleting person:', error);
        setMessage({ text: 'Failed to delete person.', type: 'error' });
      });
  };

  const personsToShow = searchTerm
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      {message.text && <Notification message={message.text} type={message.type} />}
      <div>
        <Filter value={searchTerm} onChange={handleSearchChange} />
      </div>
      
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;