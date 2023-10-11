import { useState, useEffect } from 'react'
import diaryEntryService from './services/entries'
import { DiaryEntry } from './types'
import DiatyEntryList from './components/DiaryEntryList'
import EntryForm from './components/EntryForm'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect (() => {
    diaryEntryService.getAll()
      .then(response => setEntries(response)
      )
  }, [])

  return (
    <>
      <h1>Flight diary</h1>
      <EntryForm entries={entries} setEntries={setEntries}/>
      <DiatyEntryList entries={entries}/>
    </>
  )
}

export default App
