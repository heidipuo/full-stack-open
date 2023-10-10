import { NewDiaryEntry, Visibility, Weather, DiaryEntry } from '../types'
import { useState } from 'react'
import diaryEntryService from '../services/entries'

interface SetEntriesProps {
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
    entries: DiaryEntry[]
}

const EntryForm = (props: SetEntriesProps) => {
    console.log('props', props)
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')


    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        
        const visibilityTyped: Visibility = visibility as Visibility
        const weatherTyped: Weather = weather as Weather
        const entry: NewDiaryEntry = {
            date: date,
            visibility: visibilityTyped,
            weather: weatherTyped,
            comment: comment
        }

        diaryEntryService.createEntry(entry);
        
        props.setEntries(props.entries.concat({
            ...entry,
            id: Math.floor(Math.random() * 100000)
        }))

        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    }
    
    return (
        <>
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
                <label htmlFor="weather" >weather</label>
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
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default EntryForm;