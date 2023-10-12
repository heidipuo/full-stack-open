import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(diagnosisService.getDiagnoses());
});



export default router;