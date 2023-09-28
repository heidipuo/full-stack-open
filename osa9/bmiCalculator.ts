interface Measures {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): Measures => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  switch (true) {
    case (bmi < 15):
      console.log( 'Morbid underweight');
      break;
    case (bmi < 18):
      console.log( 'Considerable underweight');
      break;
    case (bmi < 19):
      console.log( 'Moderate underweight');
      break;
    case (bmi < 25):
      console.log( 'Normal weight');
      break;
    case (bmi < 30):
      console.log( 'Moderate obesity');
      break;
    case (bmi < 35):
      console.log( 'Considerable obesity');
      break;
    case (bmi < 40):
      console.log( 'Difficult obesity');
      break;
    case (bmi >= 40):
      console.log( 'Morbid obesity');
      break;
    default:
      console.log( 'Could not define value')
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
