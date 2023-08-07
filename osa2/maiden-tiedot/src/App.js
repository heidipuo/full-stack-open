import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'

const Form = (props) => {
  console.log('form', props.newCountry)
  return(
    <div>
      find countries <input value={props.newCountry} onChange={props.handleCountryChange}/>
    </div>
  )
}

const Display = (props) => {
  
  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }else if (props.countries.length > 1) {
  return(
    <div>
        {props.countries.map((country, i) =>
           <div>
            {country.name.common}  <button type="submit" onClick={() => props.setNewCountry(country.name.common)} >show</button>
          </div>
          )}
    </div>
    )
  }else if (props.countries.length === 1){
    return(
      <div>
        <Country country={props.countries[0]} />
      </div>
    )
  }
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
      <Display countries={countriesToShow} setNewCountry={setNewCountry}/>
    </div>
  )
}


export default App;