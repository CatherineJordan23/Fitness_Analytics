const fs = require('fs');

async function healthMetricsCounter(filePath) {
    try {
        // Read the JSON file asynchronously
        const data = await fs.promises.readFile(filePath, 'utf-8');

        // Convert the JSON text into JavaScript data
        const healthData = JSON.parse(data);

        // Count the total number of health entries
        const totalEntries = healthData.metrics.length;

        console.log(`Total health entries: ${totalEntries}`);

        // Return the number of entries
        return totalEntries;

    } catch (error) {
        // Handle missing or invalid JSON files
        console.error(`Error reading health data: ${error.message}`);
        throw error;
    }
}

// Export the function so other files can use it
module.exports ={ healthMetricsCounter };

healthMetricsCounter('./data/health-metrics.json');