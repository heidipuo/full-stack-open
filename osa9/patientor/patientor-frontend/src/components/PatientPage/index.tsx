import { Typography } from "@mui/material";
import { Entry, Patient } from "../../types";
import SetGenderIcon from "./SetGenderIcon";


interface Props {
    patient: Patient | null
}

const PatientPage = ({patient}: Props) => {
    if (!patient) {
        return <>Patient not found</>
    }

    return (
        <div className="App">
        <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            {Object.values(patient.name)} <SetGenderIcon gender={patient.gender}/>
          </Typography>
          <Typography variant="body1">ssn: {Object.values(patient.ssn)} <br></br>
          occupation: {Object.values(patient.occupation)}
        </Typography>
        <Typography variant="h6" style={{marginTop: "1em", marginBottom: "0.5em" }}>
            Entries
        </Typography>
        <Typography variant="body1">
            {Object.values(patient.entries).map((entry: Entry) => (
                <div key={entry.id}><b>{entry.date}</b> {entry.description}
                    <ul >
                        {entry.diagnosisCodes.map(code => (
                        <li key={code}>{code}</li>
                        ))}
                    </ul>
                </div>
                
            )
            )}
        </Typography>
        </div>
    )
}

export default PatientPage;