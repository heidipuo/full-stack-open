import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, name is now', name)
    if (name) {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => 
        setCountry(response.data)
        )
      .catch( error => {
        if (error.response.status === 404) {
        return setCountry({name: 'not_found'})}
        })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log('country', country)
  
  if (!country) {
    return null
  }

  if (country.name === 'not_found') {
    return (
      <div>
        not found...
      </div>
    )
  } else {

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={country.flags.alt}/>  
    </div>
  )
}
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App