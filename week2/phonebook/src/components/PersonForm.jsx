import React, { useState } from 'react';

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson(newName, newPhone);
    setNewName('');
    setNewPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>phone: <input value={newPhone} onChange={handlePhoneChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  );
};

export default PersonForm;

