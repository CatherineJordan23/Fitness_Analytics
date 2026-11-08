// Test your workoutReader.js module here

const { workoutCalculator } = require('../workoutReader');
const path = require('path');

describe('Workout Reader Tests', () => {

    // Test 1: Read valid CSV data
    test('should count 10 workouts and 330 total minutes', async () => {
        const filePath = path.join(__dirname, '..', 'data', 'workouts.csv');

        const result = await workoutCalculator(filePath);

        expect(result).toEqual({ totalWorkouts: 10, totalMinutes: 330 });

    });

    // Test 2: Handle missing files
    test('should handle missing files', async () => {
        const filePath = path.join(__dirname, '..', 'data', 'missing-file.csv');

        await expect(workoutCalculator(filePath)).rejects.toThrow();

    });

});