import { Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import SetGenderIcon from "./SetGenderIcon";


interface Props {
    patient: Patient | null
}

const PatientPage = ({patient}: Props) => {
    console.log(patient)
    if (!patient) {
        return <>Patient not found</>
    }

    return (
        <div className="Patient">
        <Typography style={{ fontWeight: "bold" ,marginBottom: "0.5em", marginTop: "1em" }}>
            {Object.values(patient.name)} <SetGenderIcon gender={patient.gender}/>
          </Typography>
          ssn: {Object.values(patient.ssn)} <br></br>
          occupation: {Object.values(patient.occupation)}
        </div>
    )
}

export default PatientPage;