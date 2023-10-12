import { Typography } from "@mui/material";
import { Diagnosis, Entry, Patient } from "../../types";
import SetGenderIcon from "./SetGenderIcon";


interface Props {
    patient: Patient | null;
    diagnoses: Diagnosis[]
}

const PatientPage = ({patient, diagnoses}: Props) => {
    if (!patient) {
        return <>Patient not found</>
    }

    const setDiagnosis = (code: string) => {
        const diagnosis: Diagnosis = diagnoses.find(d => d.code === code) as Diagnosis
        return diagnosis.name
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
                        <li key={code}>{code} {setDiagnosis(code)}</li>
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