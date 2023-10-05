import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseStringElement = (element: unknown, status: string): string => {
    if (!element || !isString(element)) {
        throw new Error('Incorrect or missing ' + status);
    }
    return element;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birht: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};


const toNewPatient = (object: unknown): NewPatient => {
    console.log(object);
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseStringElement(object.name, 'name'),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseStringElement(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseStringElement(object.occupation, 'occupation')
        };
    return newPatient;
    }
    throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;