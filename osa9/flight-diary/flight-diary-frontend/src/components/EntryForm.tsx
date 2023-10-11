import { NewDiaryEntry, Visibility, Weather, DiaryEntry } from '../types'
import { useState } from 'react'
import diaryEntryService from '../services/entries'
import axios from 'axios'

interface SetEntriesProps {
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
    entries: DiaryEntry[]
}

const EntryForm = (props: SetEntriesProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const addEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        
        const visibilityTyped: Visibility = visibility as Visibility
        const weatherTyped: Weather = weather as Weather
        const entry: NewDiaryEntry = {
            date: date,
            visibility: visibilityTyped,
            weather: weatherTyped,
            comment: comment
        }

        
       try{
        await diaryEntryService.createEntry(entry);
        props.setEntries(props.entries.concat({
            ...entry,
            id: Math.floor(Math.random() * 100000)
        })) 
        
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    
    }catch (error) {
        if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data)
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
          } else {
            console.error(error);
          }
      }
    }
    
    
    
    return (
        <>
        <p style={{color: 'red'}}>{errorMessage}</p>
        
        <form onSubmit={addEntry}>
            <div>
                <label htmlFor="date" >Date</label>
                <input 
                    type="date" 
                    value={date}
                    name="date" 
                    onChange={(event) =>setDate(event.target.value)}/>
            </div>
            <div>
                <fieldset>
                    <legend>Visibility</legend>
                <input 
                    type="radio" 
                    id="great"
                    value="great"
                    name="visibility"
                    onChange={(event) => setVisibility(event.target.value)}/> 
                <label htmlFor="great" >great</label>
                
                <input 
                    type="radio" 
                    value="good"
                    id="good"
                    name="visibility"
                    onChange={(event) => setVisibility(event.target.value)}/>
                <label htmlFor="good" >good</label>
               
                <input 
                    type="radio" 
                    value="ok"
                    id="ok"
                    name="visibility"
                    onChange={(event) => setVisibility(event.target.value)}/> 
                <label htmlFor="ok" >ok</label>
               
                <input 
                    type="radio" 
                    value="poor"
                    id="poor"
                    name="visibility"
                    onChange={(event) => setVisibility(event.target.value)}/>
                <label htmlFor="poor" >poor</label>
                    </fieldset>
            </div>
            <div>
                <fieldset>
                    <legend>Weather</legend>
               
                <input 
                    type="radio"
                    id="sunny" 
                    value="sunny"
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/>
                <label htmlFor="sunny" >sunny</label>
               
                <input 
                    type="radio" 
                    id="rainy"
                    value="rainy"
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/> 
                <label htmlFor="rainy" >rainy</label>
              
                <input 
                    type="radio" 
                    id="cloudy"
                    value="cloudy"
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/>  
                <label htmlFor="cloudy" >cloudy</label>
               
                <input 
                    type="radio" 
                    id="stormy"
                    value="stormy"
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/> 
                <label htmlFor="stormy" >stormy</label>
                
                <input 
                    type="radio" 
                    id="windy"
                    value="windy"
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/>
                <label htmlFor="windy" >windy</label>
                </fieldset>
            </div>
            <div>
                <label htmlFor="comment" >Comment</label>
                <input 
                    type="text" 
                    value={comment}
                    name="comment"
                    onChange={(event) => setComment(event.target.value)}/>
            </div>
            <button type="submit">Add flight</button>
        </form>
        </>
    )
}

export default EntryForm;