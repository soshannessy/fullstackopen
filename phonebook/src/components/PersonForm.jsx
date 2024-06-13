import React from "react";

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name: 
          <input 
            type="text"
            value={newName} 
            onChange={handleNameChange} 
            placeholder="Enter name"
            required
          />
        </label>
        <br />
        <label>
          Phone: 
          <input 
            type="text"
            value={newNumber} 
            onChange={handleNumberChange} 
            placeholder="Enter phone number"
            required
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;