const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number is missing' });
  }

  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: 'Name already exists in the phonebook' });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

function generateId() {
  return Math.floor(Math.random() * 10000);
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    const personInfo = `<h2>Contact info</h2><p>Name: ${person.name}</p><p>${person.number}</p>`;
    response.send(personInfo);
  } else {
    const personNone = `<h2>Contact info</h2><p>User doesn't exist</p>`;
    response.send(personNone);
  }
});

app.get('/info', (request, response) => {
    const numberOfPersons = persons.length;
    const timestamp = new Date().toString();
    const infoMessage = `<p>Phonebook has info for ${numberOfPersons} people</p><p>${timestamp}</p>`;
    response.send(infoMessage);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});