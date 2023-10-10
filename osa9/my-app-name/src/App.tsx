import { useState, useEffect } from 'react'
import diaryEntryService from './services/entries'
import { DiaryEntry } from './types'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect (() => {
    diaryEntryService.getAll()
      .then(response => {
        setEntries(response)
        console.log(response)
      })
  }, [])

  return (
    <>
      <h1>Flight diary</h1>
      <h2>Diary entries</h2>
      {entries.map(entry => (
        <div key={entries.indexOf(entry)}>
          <h3>{entry.date} </h3> 
          visibility: {entry.visibility} <br></br>
          weather: {entry.weather} <br></br>
          comment: {entry.comment}
        </div>
        )
      )}
    </>
  )
}

export default App
