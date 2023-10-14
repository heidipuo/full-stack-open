import { Diagnosis } from "../../types";

export const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    display: 'flex', 
    justifyContent: 'left', 
    borderRadius: 1,
    padding: "10px" 
  };

  export const setDiagnosis = (code: string, diagnoses: Diagnosis[]) => {
    const diagnosis: Diagnosis = diagnoses.find(d => d.code === code) as Diagnosis
    return diagnosis.name
}