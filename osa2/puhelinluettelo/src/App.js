

import { useState, useEffect } from 'react'
//import axios from 'axios'

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

const Notification = (props) => {
  if (props.message === '') {
    return null
  }

  return (
      <div className={props.style}> {props.message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searhText, setSearchText] = useState('')
  const [message, setMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('')

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
    console.log('Uusi', newName, persons, 'nimet', names)
    if (names.includes(newName.trim())) {
      if (window.confirm(`${newName.trim()} is already added to the phonebook. Do you want to replace the old number with new one?`)) {
        replacePerson(newName.trim(), newNumber)
      }
      setNewName('') 
      setNewNumber('')
    }else{
     const person = {name: newName.trim(), number: newNumber}
    
     personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationStyle('success')
        setMessage(`${returnedPerson.name} added`)
        setEmptyMessage()
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        setNotificationStyle('error')
        setMessage(`${error.response.data.error}`)
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
          setNotificationStyle('success')
          setMessage(`${personToDelete.name} deleted`)
          setEmptyMessage()
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
          setPersons(persons.map(person => person.id !== personWithNewNumber.id ? person : returnedPerson))
          setNotificationStyle('success')
          setMessage(`The number of ${returnedPerson.name} has been changed to ${returnedPerson.number}`)
          setEmptyMessage()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationStyle('error')
          setMessage(`Information of ${personWithNewNumber.name} has already been deleted from the server`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
  }
  
  const setEmptyMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
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
      <h1>Phonebook</h1>
      <Notification message = {message} style = {notificationStyle} />
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