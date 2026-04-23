
export interface BMI {
    height: number,
    weight: number
}


function calculateBMI(height: number, weight: number): string {
    const height_m = height/100;
    const BMI = weight/(height_m * height_m);   
    if(BMI < 16.0)return 'Underweight (Severe thinness)'; 
    else if(BMI >= 16.0 && BMI < 17.0) return 'Underweight (Moderate thinness)';
    else if(BMI >= 17.0 && BMI < 18.5) return 'Underweight (Mild thinness)';
    else if(BMI >= 18.5 && BMI < 25.0) return 'Normal range';
    else if(BMI >= 25.0 && BMI < 30.0) return 'Overweight (Pre-obese)';
    else if(BMI >= 30.0 && BMI < 35.0) return 'Obese (Class I)';
    else if(BMI >= 35.0 && BMI < 40.0) return 'Obese (Class II)';
    else if(BMI >= 40.0) return 'Obese (Class III)';
    else return 'Error BMI';
}


if (process.argv[1] === import.meta.filename) {

    const parseArguments = (args: string[]): BMI  => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            return {
                height: Number(args[2]),
                weight: Number(args[3])
            };
        } else {
            throw new Error('Provided values were not numbers!');
        }
    };

    try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBMI(height, weight));
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }

}


export default calculateBMI;