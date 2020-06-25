const _ = require('lodash')

interface ResultValues {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface calculateValues {
  args: Array<number>;
  target: number;
}

const parseArgumentsExercise = (args: Array<string>): calculateValues => {
  if (args.length < 3) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  _.pullAt(args, [0, 1, 2]);
  const array = args.map(a => { 
    if(!isNaN(Number(a))) {
      return Number(a);
    } else {
      throw new Error('Values should be numbers');
    }
  })
  if(!isNaN(target)) {
    return { args: array, target }; 
  } else {
    throw new Error('Values should be numbers');
  }
}

const calculateExercises = (args: Array<number>, target: number): ResultValues => {
  const periodLength = args.length;
  const trainingDays = args.reduce((count, day) => day === 0 ? count : count + 1, 0);
  const average = args.reduce((count, day) => count + day, 0)/periodLength;
  const success = average >= target ? true : false; 
  let rating, ratingDescription;

  switch(true) {
    case (average === target):
      rating = 3;
      ratingDescription = 'just aas planned';
      break;
    case (average > target):
      rating = 3;
      ratingDescription = 'wow, you outdone yourself';
      break;
    case ((average/target) > 0.7 ):
      rating = 2;
      ratingDescription = 'not bad, but could be better';
      break;
    default:
      rating = 1;
      ratingDescription = 'too bad, better luck next time';
  }

  return { 
    periodLength, 
    trainingDays, 
    target, 
    average,
    success,
    rating,
    ratingDescription 
  }
}

try {
 const { args, target } = parseArgumentsExercise(process.argv);
 console.log(calculateExercises(args, target));
} catch(e) {
  console.log('Error: ', e.message);
}