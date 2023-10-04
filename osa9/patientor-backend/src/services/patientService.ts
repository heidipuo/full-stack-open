import patients from "../../data/patientData";

import { Patient, NonSensitivePatientInfo } from "../types";

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

export default {
    getPatients, 
    getNonSensitivePatients
};