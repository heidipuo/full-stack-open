import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

const Person = (props) => {
  console.log("person", props)
  
  return(
    <p>{props.person.name} {props.person.number} 
    <button type="submit" onClick={props.deletePerson(props.person.id)}>delete</button></p>
  )
}

const Persons = (props) => {
  console.log("persons", props )
  return(
    <div>
      {props.persons.map((person, i) => 
        <Person key={i} person={person} deletePerson={props.deletePerson}/>  
      )} 
    </div> 
  )
}

const Filter = (props) => {
  return(
    <div>
      filter shown with <input onChange={props.handleSearcChange} />
    </div>
  )
}

const PersonForm = (props) => {
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
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    var names = persons.map(person => person.name) 
    var newNameTrim = newName.trim()
    console.log('Uusi', newNameTrim, persons, 'nimet', names)
    if (names.includes(newNameTrim)) {
      if (window.confirm(`${newNameTrim} is already added to the phonebook. Do you want to replace the old number with new one?`)) {
        replacePerson(newNameTrim, newNumber)
      }
      setNewName('') 
      setNewNumber('')
    }else{
     const person = {name: newNameTrim, number: newNumber}
    
     personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (id) => (event) =>  {
    event.preventDefault()
    var personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)){
      console.log("deleting a person")
      personService
        .deletePerson(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id))
          console.log("poistettu")
        })
    }
  }

  const replacePerson = (newName, newNumber) => {
      const person = persons.find(person => person.name === newName)
      const personWithNewNumber = {name: person.name, number: newNumber, id: person.id}

      personService
        .replacePerson(personWithNewNumber)
        .then(returnedPerson => {
          console.log('returned', returnedPerson)
          setPersons(persons.map(person => person.id !== personWithNewNumber.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>  
  )
}

export default App
