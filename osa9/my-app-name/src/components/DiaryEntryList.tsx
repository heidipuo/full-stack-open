import { DiaryEntry } from "../types"

interface EntryProps {
    entries: DiaryEntry[]
}

const DiatyEntryList = (props: EntryProps) => {
    return (
        <>
        <h2>Diary entries</h2>
        {props.entries.map(entry => (
        <div key={props.entries.indexOf(entry)}>
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

export default DiatyEntryList