const express = require('express');
const router = express.Router();
const { crowdData } = require('../controllers/crowdController');

router.get('/wait-times', (req, res) => {
    const data = crowdData.map(zone => ({
        id: zone.id,
        name: zone.name,
        waitTime: zone.servicePoints > 0 ? Math.round((zone.people * zone.avgServiceTime) / zone.servicePoints) : 0,
        status: zone.people > zone.capacity * 0.8 ? 'High' : (zone.people > zone.capacity * 0.4 ? 'Medium' : 'Low')
    }));
    res.json(data);
});

module.exports = router;
