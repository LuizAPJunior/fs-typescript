interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseData {
    targetHours: number,
    dailyExercise: number[]
}

export function calculateExercise(dailyExercise: number[], targetHours: number): ExerciseResult {
    const trainingDays: number[] = dailyExercise.filter((hours) => hours > 0);
    const totalHours: number = dailyExercise.reduce((hoursTotal, hours) =>  hoursTotal + hours, 0);
    const averageHours: number = totalHours / dailyExercise.length;
    let success: boolean = false;
    if(averageHours >= targetHours) {
        success = true;
    }
    
    let rating: number;
    let ratingDescription: string;

    if(averageHours >= targetHours){
        rating = 3;
        ratingDescription = 'Well done! the target daily hours were met.';
    } else if(averageHours >= targetHours * 0.75){
        rating = 2;
        ratingDescription = 'You did good, but it could be better.';
    } else if(averageHours > 0){
        rating = 1;
        ratingDescription = 'You need to train more.';
    } else {
        rating = 0;
        ratingDescription = 'You didn\'t train at all, please train.';
    }

    return {
        periodLength: dailyExercise.length,
        trainingDays: trainingDays.length,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average: averageHours
    };
}


if (process.argv[1] === import.meta.filename) {
    const parseArgumentsExercise = (args: string[]): ExerciseData  => {
        if (args.length < 4) throw new Error('Not enough arguments');
        const dailyHours: number[] = [];
        for(let i = 2; i < args.length; i++){
            if(isNaN(Number(args[i]))) throw new Error('Provided values were not numbers!');
            if(i > 2) dailyHours.push(Number(args[i]));
        }
        return {
            targetHours: Number(args[2]),
            dailyExercise: dailyHours
        };
    };

    try {
    const { targetHours, dailyExercise } = parseArgumentsExercise(process.argv);
    console.log(calculateExercise(dailyExercise, targetHours));
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }
}

 