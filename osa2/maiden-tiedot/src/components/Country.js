import React from 'react';
import Weather from './Weather';

const Country = ({country}) => {
    console.log('info', {country})
    return(
      <div>
        <h1>{country.name.common}</h1> 
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((language, i) => (
              <li key={i}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`${country.name.common} flag`} />  
          <Weather city={country.capital}/>
      </div>
      
    )
  }

  export default Country