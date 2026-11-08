const {healthMetricsCounter} = require('../healthReader');
const path = require('path');

describe('Health Reader Tests', () => {
    
    // Test 1: Read valid JSON data
    test('should count 8 health entries', async () => {
        const filePath = path.join(__dirname, '..', 'data', 'health-metrics.json');
        
        const results = await healthMetricsCounter(filePath);

        expect(results).toBe(8);
    });

    // Test 2: Handle missing files
    test('should return an error when the file is missing', async () => {
        const filePath = path.join(__dirname, '..', 'data', 'missing-file.json');

        await expect(healthMetricsCounter(filePath)).rejects.toThrow();

    });

});
