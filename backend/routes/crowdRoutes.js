const express = require('express');
const router = express.Router();
const { getCrowdStatus, updateCrowdData } = require('../controllers/crowdController');

router.get('/', getCrowdStatus);
router.get('/status', getCrowdStatus);
router.post('/update', updateCrowdData);

module.exports = router;
