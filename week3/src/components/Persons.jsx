const Persons = ({ people, onDelete }) => (
  <ul>
    {people.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </li>
    ))}
  </ul>
);

export default Persons;

