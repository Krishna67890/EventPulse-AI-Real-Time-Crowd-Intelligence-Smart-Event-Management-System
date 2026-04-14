const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const crowdRoutes = require('./routes/crowdRoutes');
const { crowdData } = require('./controllers/crowdController');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/crowd', crowdRoutes);

// Simulation State
let isEmergency = false;

// Simulate real-time data updates
setInterval(() => {
  crowdData.forEach(zone => {
    // Random walk simulation
    const drift = isEmergency ? -15 : (Math.random() > 0.5 ? 5 : -3);
    zone.people = Math.max(0, Math.min(zone.capacity, zone.people + drift + Math.floor(Math.random() * 10) - 5));
  });

  const message = JSON.stringify({
    type: 'CROWD_UPDATE',
    data: crowdData,
    isEmergency
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 3000);

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'WELCOME', message: 'Neural Link Established' }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
