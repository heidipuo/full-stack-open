import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/bmi', (req, res) => {

   
  try {
    const result = calculateBmi(Number(req.query.height), Number(req.query.weight));
    const bmi = {
        weight: req.query.weight,
        height: req.query.height, 
        bmi: result};
    res.send(bmi);
}catch (error) {
    res.status(400).send({error: 'malformatted parameters'});
  } 
  
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
    

    if( !daily_exercises || !target) {
      res.status(422).send({error: 'parameters missing'});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (daily_exercises.every((e: any) => !isNaN(Number(e))) && !isNaN(Number(target))){
     
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      daily_exercises.map((e: any) => Number(e));
    }else{
      res.status(400).send({error: 'malformatted parameters'});
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const result = calculateExercises(daily_exercises, Number(target));
    res.send(result );

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});