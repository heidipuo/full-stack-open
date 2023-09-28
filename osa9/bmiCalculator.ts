const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  switch (true) {
    case (bmi < 15):
      return 'Morbid underweight';
    case (bmi < 18):
      return 'Considerable underweight';
    case (bmi < 19):
      return 'Moderate underweight';
    case (bmi < 25):
      return 'Normal weight';
    case (bmi < 30):
      return 'Moderate obesity';
    case (bmi < 35):
      return 'Considerable obesity';
    case (bmi < 40):
      return 'Difficult obesity';
    default:
      return 'Morbid obesity'
  }
}

console.log(calculateBmi(180, 74))