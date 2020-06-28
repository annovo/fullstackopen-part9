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
interface Body {
  target: unknown,
  daily_exercises: Array<unknown>
}

export const parseArgumentsExercise = (args: Body | undefined ): calculateValues => {
  if (!args || !args.target || !args.daily_exercises) throw new Error('Not enough arguments');
  const target = Number(args.target);
  const exercises = args.daily_exercises;
  const array = exercises.map(a => { 
    if(!isNaN(Number(a))) {
      return Number(a);
    } else {
      throw new Error('Values should be numbers');
    }
  });
  if(!isNaN(target)) {
    return { args: array, target }; 
  } else {
    throw new Error('Values should be numbers');
  }
};

export const calculateExercises = (args: Array<number>, target: number): ResultValues => {
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
  };
};