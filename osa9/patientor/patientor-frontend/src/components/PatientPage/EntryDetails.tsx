import { Diagnosis, Entry } from "../../types";
import HealthCheck from "./HealtCheckEntry";
import Hospital from "./HospitalEntry";
import OccupationalHealtcare from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital  entry={entry} diagnoses={diagnoses}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealtcare entry={entry} diagnoses={diagnoses}/>;
        case 'HealthCheck':
            return <HealthCheck entry={entry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry)
    }
}

export default EntryDetails;