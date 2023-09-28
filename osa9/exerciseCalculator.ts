interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string, 
    target: number,
    average: number
}

const calculateExercices = (exercises: number[], target: number): Result => { 
    const allHours = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const average = allHours / exercises.length
    let rating = 0
    let ratingDescription = ''
    
    if(target * 0.7 > average) {
        rating = 1
        ratingDescription = 'Didn\'t quite meet your goal, try again next week'
    }else if(target > average) {
        rating = 2
        ratingDescription = 'Good job, just a bit short of your goal'
    }else{
        rating = 3
        ratingDescription = 'Well done! You have met your goal'
    }

    return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(day => day !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription , 
    target: target,
    average: average
    }
}

console.log(calculateExercices([3, 0, 2, 4.5, 0, 3, 1], 2.8))
