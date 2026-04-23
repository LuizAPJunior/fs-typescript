import express from 'express';
import calculateBMI from './bmiCalculator.ts';
import { calculateExercise } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;
    if(!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))){
        res.status(400).send({"error": "malformatted parameters"});
    }
    const bmi = calculateBMI(Number(height), Number(weight));
    
    res.send({
        height: Number(height),
        weight: Number(weight),
        bmi
    });
});

app.post('/exercises', (req, res) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target}  = req.body;

  if(!daily_exercises|| !target) res.status(400).send({  error: "parameters missing"});
     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,
  for(let i: number = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,
    if (isNaN(Number(daily_exercises[i])))  res.status(400).send({  error: "malformatted parameters"});
  }
  
  if(!(daily_exercises as number[]) || isNaN(Number(target))) res.status(400).send({  error: "malformatted parameters"});

  const exerciseResult = calculateExercise(daily_exercises as number[], Number(target));
  res.send(exerciseResult);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});