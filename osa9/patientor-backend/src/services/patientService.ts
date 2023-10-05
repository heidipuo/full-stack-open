import patients from "../../data/patientData";

import { Patient, NonSensitivePatientInfo, NewPatient } from "../types";

const getPatients = ():Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientInfo[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name, 
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient): Patient => {
    
    const newPatient = {
        id: Math.floor(Math.random() * 10000000).toString(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients, 
    getNonSensitivePatients,
    addPatient
};