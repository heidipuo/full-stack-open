import { Typography } from "@mui/material";
import { Diagnosis, Entry, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import SetGenderIcon from "./SetGenderIcon";
import React from "react";


interface Props {
    patient: Patient | null;
    diagnoses: Diagnosis[]
}

const PatientPage = ({patient, diagnoses}: Props) => {
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
        <div style={{ fontFamily: "sans-serif"}}>
            {Object.values(patient.entries).map((entry: Entry) => (
                <EntryDetails entry={entry} diagnoses={diagnoses}/>
                
            )
            )}
        </div>
        </div>
    )
}

export default PatientPage;


