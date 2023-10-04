import diagnoses from '../../data/diagnosisData';

import { Diagnosis } from '../types';


const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};