const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        id: 1,
        name: 'Arto Hellas', 
        number: '040-123456' 
    },
    { 
        id: 2,
        name: 'Ada Lovelace', 
        number: '39-44-5323523' 
    },
    { 
        id: 3,
        name: 'Dan Abramov', 
        number: '12-43-234345' 
    },
    { 
        id: 4,
        name: 'Mary Poppendieck', 
        number: '39-23-6423122' 
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const lenght = persons.length
    const timestamp = new Date(Date.now())
    res.send(`<p>The phonebook has info of ${lenght} person(s)</p>
    <p>${timestamp}</p>`)
} )

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const id = parseInt(Math.random() * 10000)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body)

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
  
    if (persons.find(person => person.name === body.name)) { 
        return response.status(406).json({ 
            error: 'name must be unique' 
          })
    
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    console.log('id', person.id)
    persons = persons.concat(person)

    response.json(person)
  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) 
})