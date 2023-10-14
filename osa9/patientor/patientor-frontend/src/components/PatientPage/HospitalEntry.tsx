import { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { commonStyles } from "./utils";

import Box from '@mui/material/Box';


interface Props {
 entry: HospitalEntry, 
 diagnoses: Diagnosis[]
}

const Hospital = ({entry, diagnoses}: Props) => {
    
    const setDiagnosis = (code: string) => {
        console.log(code)
        const diagnosis: Diagnosis = diagnoses.find(d => d.code === code) as Diagnosis
        console.log(diagnosis)
        return diagnosis.name
    }

    return (
        <Box sx={{...commonStyles}}>
        <div key={entry.id}><b>{entry.date}</b> <LocalHospitalIcon/>  
        <p>{entry.description}</p>
        <ul >
            {entry.diagnosisCodes.map(code => (
            <li key={code}>{code} {setDiagnosis(code)} </li>
            ))}
        </ul>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Discharged {entry.discharge.date}: {entry.discharge.criteria} </p>

    </div>
    </Box>
    )
}

export default Hospital;