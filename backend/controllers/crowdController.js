const { predictFutureTrends } = require('../utils/predictionEngine');

let crowdData = [
  { id: 'intl_airport', name: 'Aero-Transit Hub (Airport)', people: 1200, capacity: 5000, servicePoints: 12, avgServiceTime: 15, lat: 51.505, lng: -0.09, type: 'airport' },
  { id: 'central_station', name: 'Central Pulse Terminal (Train)', people: 850, capacity: 2000, servicePoints: 8, avgServiceTime: 5, lat: 51.51, lng: -0.1, type: 'train' },
  { id: 'metro_bus_bay', name: 'Nexus Bus Interchange', people: 350, capacity: 1000, servicePoints: 15, avgServiceTime: 2, lat: 51.51, lng: -0.08, type: 'bus' },
  { id: 'north_shuttle', name: 'North Orbital Shuttle', people: 120, capacity: 300, servicePoints: 4, avgServiceTime: 3, lat: 51.50, lng: -0.07, type: 'shuttle' },
  { id: 'main_stage', name: 'Main Event Arena', people: 4200, capacity: 5000, servicePoints: 4, avgServiceTime: 0, lat: 51.508, lng: -0.085, type: 'arena' },
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
