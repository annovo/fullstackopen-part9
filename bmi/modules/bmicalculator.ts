interface bmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (heightString: unknown, weightString: unknown): bmiValues => {
  // if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(heightString);
  const weight = Number(weightString);

  if(!isNaN(height) && !isNaN(weight) && weight !== 0 && height !== 0) {
    return { height, weight };
  } else {
    throw new Error('malformatted parameters');
  }
};

export const calculateBmi = (height: number, weight: number): string =>{
  const heightInMetres = height / 100;
  const bmi = weight / (Math.pow(heightInMetres, 2));
  switch(true) {
    case (bmi < 15):
      return 'Very severly underweight';
    case (bmi > 15 && bmi < 16):
      return 'Severly underweight';
    case (bmi > 16 && bmi < 18.5):
      return 'Underweight';
    case (bmi > 18.5 && bmi < 25):
      return 'Normal (healty weight)';
    case (bmi > 25 && bmi < 30):
      return 'Overweight';
    case (bmi > 30 && bmi < 35):
      return 'Obese Class I (Moderate obese)';
    case (bmi > 35 && bmi < 40):
      return 'Obese Class II (Severly obese)';
    case (bmi > 40):
      return 'Obese Class III (Very severly obese)';
    default: 
      return 'Error';
  }
};