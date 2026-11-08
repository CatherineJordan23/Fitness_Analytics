// Load environment variables 
require('dotenv').config();

// Import the reader functions
const {healthMetricsCounter} = require('./healthReader');
const {workoutCalculator} = require('./workoutReader');

// Main function to process both files
async function processFiles() {
    try {
        //Get name and weekly goal from .env
        const userName = process.env.USER_NAME;
        const weeklyGoal = Number(process.env.WEEKLY_GOAL);

        console.log(`Processing data for: ${userName}`);

        // Read workout data
        console.log('Reading workout data...');
        const workoutData = await workoutCalculator('./data/workouts.csv');

        // Read health data
        console.log('Reading health data...');
        const healthData = await healthMetricsCounter('./data/health-metrics.json');

        // Display the results
        console.log('\nSummary:');
        console.log(`Workouts found: ${workoutData.totalWorkouts}`);
        console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
        console.log(`Health entries found: ${healthData}`);
        console.log(`Weekly goal: ${weeklyGoal} minutes`);

        // Check weekly goal
        if (workoutData.totalMinutes >= weeklyGoal) {
            console.log('Congratulations ${userName}! You have met your weekly goal!');
        } else {
            console.log(`Keep going ${userName}! You need ${weeklyGoal - workoutData.totalMinutes} more minutes to reach your weekly goal.`);
        }

    } catch (error) {
        console.error('Unable to process files. Please check your data files and try again.');
    }

}

// Run the main program
processFiles();