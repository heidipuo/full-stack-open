import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import { commonStyles, setDiagnosis } from "./utils";
import Box from '@mui/material/Box';



interface Props {
 entry: OccupationalHealthcareEntry, 
 diagnoses: Diagnosis[]
}

const SickLeave = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    
    if (!entry.sickLeave) {
        return null
    }
    return (
         <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
    )
}

const OccupationalHealtcare= ({entry, diagnoses}: Props) => {

     return (
        <Box sx={{...commonStyles}}>
        <div key={entry.id}><b>{entry.date} <WorkIcon/> </b> {entry.employerName} 
        <p>{entry.description}</p>
        <ul >
            {entry.diagnosisCodes.map(code => (
            <li key={code}>{code} {setDiagnosis(code, diagnoses)}</li>
            ))}
        </ul>
        <p>Diagnosed by {entry.specialist}</p>
        <SickLeave entry={entry}/>
    </div>
    </Box>
    )
}

export default OccupationalHealtcare