import { useState } from 'react'


const App = (props) => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button click', event.target)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Note key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App