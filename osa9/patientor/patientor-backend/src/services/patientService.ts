import patients from "../../data/patientData";
import { v1 as uuid } from 'uuid';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = uuid() as string;
    const newPatient = {
        id: id,
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