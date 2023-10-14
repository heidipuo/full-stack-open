import { Diagnosis, HealthCheckEntry } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HealthCheckRatingSymbol from "./HealtRatingSymbol";
import { commonStyles, setDiagnosis } from "./utils";

import Box from '@mui/material/Box';




interface PropsEntry {
 entry: HealthCheckEntry, 
 diagnoses: Diagnosis[]
}


const HealthCheck = ({entry, diagnoses}: PropsEntry) => {
    


    return (
       
    <Box sx={{...commonStyles}}>
      <div key={entry.id}><b>{entry.date}</b> <MonitorHeartIcon/>
        <p>{entry.description}</p>
        <ul >
            {entry.diagnosisCodes.map(code => (
            <li key={code}>{code} {setDiagnosis(code, diagnoses)}</li>
            ))}
        </ul>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Health rating <HealthCheckRatingSymbol rate={entry.healthCheckRating}/></p>
      </div>
    </Box>
   

    
    )
}

export default HealthCheck;