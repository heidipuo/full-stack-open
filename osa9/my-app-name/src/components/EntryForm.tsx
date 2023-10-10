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
        
       

        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    }
    
    
    
    return (
        <>
        <p style={{color: 'red'}}>{errorMessage}</p>
        
        <form onSubmit={addEntry}>
            <div>
                <label htmlFor="date" >Date</label>
                <input 
                    type="text" 
                    value={date}
                    name="date" 
                    onChange={(event) =>setDate(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="visibility" >Visibility</label>
                <input 
                    type="text" 
                    value={visibility}
                    name="visibility"
                    onChange={(event) => setVisibility(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="weather" >Weather</label>
                <input 
                    type="text" 
                    value={weather}
                    name="weather"
                    onChange={(event) => setWeather(event.target.value)}/>
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