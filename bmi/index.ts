import express from 'express';
import { calculateBmi, parseArguments } from './modules/bmicalculator';
import { calculateExercises, parseArgumentsExercise } from './modules/exerciseCalculator';

interface Error {
  error: string;
}
const returnError = (e: { message: string }): Error => {
  return { error: e.message};
};

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
  try {
    const {height, weight} = parseArguments(req.query.height, req.query.weight);
    const bmi = calculateBmi(height, weight);
    const result = { weight, height, bmi };
    res.send(result);
  } catch(e) {
    const error = returnError(e);
    res.status(400).send(error);
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { args, target } = parseArgumentsExercise(req.body);
    const result = calculateExercises(args, target);
    res.send(result);
  } catch(e) {
    res.status(400).send(returnError(e));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});