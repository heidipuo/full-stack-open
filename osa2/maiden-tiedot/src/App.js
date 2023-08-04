import { useState, useEffect } from 'react'
import axios from 'axios'


const Form = (props) => {
  console.log('form', props.newCountry)
  return(
    <div>
      find countries <input value={props.newCountry} onChange={props.handleCountryChange}/>
    </div>
  )
}

const Countries = (props) => {
  
  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }else if (props.countries.length > 1) {
  return(
    <div>
        {props.countries.map((country, i) =>
          <CountryName key={i} country={country} /> 
          )}
    </div>
    )
  }else if (props.countries.length === 1){
    return(
      <div>
        <CountryInfo country={props.countries[0]} />
      </div>
    )
  }
}

const CountryName = (props) => {
  return(
    <div>
      {props.country.name.common}
    </div>
  )
}

const CountryInfo = (props) => {
  console.log('info', props.country)
  return(
    <div>
      <h1>{props.country.name.common}</h1> 
        <p>capital {props.country.capital}</p>
        <p>area {props.country.area}</p>
      <h2>Languages</h2>
      <ul>
          {Object.values(props.country.languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
        <img src={props.country.flags.png} alt={`${props.country.name.common} flag`} />  
    </div>
    
  )
}


const App = () => {
  const[newCountry, setNewCountry] = useState('')
  const[countries, setCountries] = useState([])

  
  const getCountryInfo = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
  }
  
  const handleCountryChange = (event) => {
    if (countries.length === 0) {
      getCountryInfo() 
    }
    
    setNewCountry(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

  return (
    <div>
      <h1>Country info</h1>
      <Form newCountry={newCountry} handleCountryChange={handleCountryChange} getCountryInfo={getCountryInfo} countries={countries}/>
      <Countries countries={countriesToShow}/>
    </div>
  )
}


export default App;