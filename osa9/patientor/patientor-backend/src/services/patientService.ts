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
    const id: string = uuid();
    const newPatient = {
        id: id,
        entries: [],
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatientById = (id: string): Patient=> {
    const patient: Patient = patients.find(p => p.id === id) as Patient;
    return patient;
};

export default {
    getPatients, 
    getNonSensitivePatients,
    addPatient,
    getPatientById
};