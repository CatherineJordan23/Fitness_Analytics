const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath) {
    try {
        const workouts = [];

        // Read the CSV file asynchronously
        await new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath)

            stream
                .pipe(csv())
                .on('data', (row) => {
                    workouts.push(row);
                })
                .on('end', resolve)
                .on('error', reject);

                stream.on('error', reject);
        });
        


        // Count the total number of workouts
        const totalWorkouts = workouts.length;

        // Calculate the total workout minutes using a for loop
        let totalMinutes = 0;

        for (let i = 0; i < workouts.length; i++) {
            totalMinutes += Number(workouts[i].duration);
        }

        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes: ${totalMinutes}`);

        return { totalWorkouts, totalMinutes };

    } catch (error) {
        console.error(`Error reading workout data: ${error.message}`);
        throw error;
    }
}

// Export the function
module.exports = { workoutCalculator };

workoutCalculator('./data/workouts.csv');