import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/bmi', (req, res) => {

   
  try {
    const result = calculateBmi(Number(req.query.height), Number(req.query.weight))
    const bmi = {
        weight: req.query.weight,
        height: req.query.height, 
        bmi: result}
    res.send(bmi)
}catch (error) {
    res.send({error: 'malformatted parameters'})
  } 
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});