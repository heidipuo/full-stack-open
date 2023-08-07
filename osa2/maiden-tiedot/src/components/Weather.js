import { useEffect, useState } from 'react';
import axios from 'axios';


 
const Weather = ({city}) => {

    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`

    const [weather, setWeather] = useState(null)
    const [wind, setWind] = useState(null)

    useEffect(() => {
        
        console.log('starting use effect')
            
        axios.get(url)
        .then(response => {
            setWeather(response.data)
            setWind((response.data.current.wind_kph * 0.277777778).toFixed(0))
            console.log(response.data)
        }).catch(error=>console.error())
      }, [])
    
    return (
        <>
        {weather ? (
            <div>
                <h2>Weather in {city} </h2>
                <p>{weather.current.condition.text} {weather.current.temp_c} °C</p>
                <img src={weather.current.condition.icon} alt={'weather icon'}/>
                <p>Wind {wind} m/s</p>
            </div>
        ) : null}
        </>
    )
}


export default Weather