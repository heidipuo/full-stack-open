import { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { commonStyles, setDiagnosis } from "./utils";

import Box from '@mui/material/Box';


interface Props {
 entry: HospitalEntry, 
 diagnoses: Diagnosis[]
}

const Hospital = ({entry, diagnoses}: Props) => {
    

    return (
        <Box sx={{...commonStyles}}>
        <div key={entry.id}><b>{entry.date}</b> <LocalHospitalIcon/>  
        <p>{entry.description}</p>
        <ul >
            {entry.diagnosisCodes.map(code => (
            <li key={code}>{code} {setDiagnosis(code, diagnoses)} </li>
            ))}
        </ul>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Discharged {entry.discharge.date}: {entry.discharge.criteria} </p>

    </div>
    </Box>
    )
}

export default Hospital;