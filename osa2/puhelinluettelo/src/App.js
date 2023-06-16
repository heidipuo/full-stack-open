import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  console.log("person", {person})
  return(
  <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  console.log("persons", )
  return(
    <div>
      {persons.map((person, i) => 
        <Person key={i} person={person}/>
      )}
    </div>
  )
}

const Filter = (props) => {
  console.log("filter", props)
  return(
  <div>
    filter shown with <input onChange={props.handleSearcChange} />
  </div>
  )
}

const PersonForm = (props) => {
  console.log("form", props)
  return(
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searhText, setSearchText] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    var names = persons.map(person => person.name) 
    console.log( newName, persons, names)
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('') 
      setNewNumber('')
    }else{
     const person = {name: newName, number: newNumber}
      setPersons(persons.concat(person))
      setNewName('') 
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearcChange = (event) => {
    setSearchText(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searhText.toLowerCase()))
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearcChange={handleSearcChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>  
  )
}

export default App