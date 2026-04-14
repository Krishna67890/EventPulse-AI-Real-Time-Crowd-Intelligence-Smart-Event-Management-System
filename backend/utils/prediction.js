/**
 * Simple AI-simulated crowd density prediction logic.
 */
const predictCrowdLevel = (count) => {
    if (count < 100) return 'Low';
    if (count < 300) return 'Medium';
    return 'High';
};

const calculateWaitTime = (peopleCount, avgServiceTime, servicePoints) => {
    if (servicePoints <= 0) return Infinity;
    return (peopleCount * avgServiceTime) / servicePoints;
};

module.exports = { predictCrowdLevel, calculateWaitTime };
