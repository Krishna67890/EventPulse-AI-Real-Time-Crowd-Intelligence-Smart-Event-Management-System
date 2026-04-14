const { predictFutureTrends } = require('../utils/predictionEngine');

let crowdData = [
  { id: 'gate_a', name: 'Gate A', people: 120, capacity: 500, servicePoints: 3, avgServiceTime: 4, lat: 51.505, lng: -0.09 },
  { id: 'gate_b', name: 'Gate B', people: 45, capacity: 500, servicePoints: 3, avgServiceTime: 4, lat: 51.51, lng: -0.1 },
  { id: 'food_court', name: 'Food Court', people: 350, capacity: 1000, servicePoints: 8, avgServiceTime: 10, lat: 51.51, lng: -0.08 },
  { id: 'washroom_main', name: 'Main Washrooms', people: 80, capacity: 200, servicePoints: 12, avgServiceTime: 3, lat: 51.50, lng: -0.07 },
  { id: 'main_stage', name: 'Main Stage', people: 1200, capacity: 2500, servicePoints: 1, avgServiceTime: 0, lat: 51.508, lng: -0.085 },
];

let isEmergencyMode = false;

const getCrowdStatus = (req, res) => {
  const enhancedData = crowdData.map(zone => {
    const aiData = predictFutureTrends(zone.people, zone.capacity);
    const waitTime = zone.servicePoints > 0 ? (zone.people * zone.avgServiceTime) / zone.servicePoints : 0;

    return {
      ...zone,
      ai: aiData,
      waitTime: Math.round(waitTime),
      status: aiData.current.level
    };
  });
  res.json({
    zones: enhancedData,
    isEmergencyMode,
    timestamp: new Date().toISOString()
  });
};

const updateCrowdData = (req, res) => {
    const { id, people, servicePoints, capacity, emergency } = req.body;

    if (emergency !== undefined) {
        isEmergencyMode = emergency;
        return res.json({ success: true, isEmergencyMode });
    }

    const zoneIndex = crowdData.findIndex(z => z.id === id);
    if (zoneIndex !== -1) {
        if (people !== undefined) crowdData[zoneIndex].people = people;
        if (servicePoints !== undefined) crowdData[zoneIndex].servicePoints = servicePoints;
        if (capacity !== undefined) crowdData[zoneIndex].capacity = capacity;
        res.json({ success: true, zone: crowdData[zoneIndex] });
    } else {
        res.status(404).json({ error: 'Zone not found' });
    }
};

module.exports = { getCrowdStatus, updateCrowdData, crowdData };
