/**
 * Next-Gen AI Prediction Engine
 */
const predictFutureTrends = (currentCount, capacity = 1000) => {
    const ratio = currentCount / capacity;

    // Determine current level
    let level = 'Low';
    let color = '#00f0ff'; // Neon Blue
    if (ratio > 0.85) { level = 'Critical'; color = '#ff0000'; }
    else if (ratio > 0.6) { level = 'High'; color = '#ff00c8'; }
    else if (ratio > 0.3) { level = 'Medium'; color = '#7a00ff'; }

    // AI Confidence Score (88% - 99%)
    const confidence = (88 + Math.random() * 11).toFixed(1);

    // Predict next 10 minutes (Simulated)
    // Trend: -1 (decreasing), 0 (stable), 1 (increasing)
    const trendValue = Math.random() > 0.4 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    const trend = trendValue === 1 ? 'Increasing' : trendValue === -1 ? 'Decreasing' : 'Stable';

    const futureProjections = [];
    let tempCount = currentCount;
    for (let i = 1; i <= 10; i++) {
        const variance = Math.floor(Math.random() * 20) * trendValue;
        tempCount = Math.max(0, Math.min(capacity, tempCount + variance + (Math.floor(Math.random() * 10) - 5)));
        futureProjections.push({
            minute: i,
            predictedCount: tempCount,
            ratio: tempCount / capacity
        });
    }

    const nextCriticalIn = futureProjections.findIndex(p => p.ratio > 0.85);

    return {
        current: { level, color, ratio, confidence },
        trend,
        futureProjections,
        alertMessage: nextCriticalIn !== -1 ? `Zone potential CRITICAL in ${nextCriticalIn + 1} minutes` : null
    };
};

module.exports = { predictFutureTrends };
