# EventPulse AI – Real-Time Crowd Intelligence Platform

A high-performance, visually stunning full-stack application for real-time crowd monitoring and predictive analytics.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts, Leaflet.js
- **Backend**: Node.js, Express, WebSockets (ws)
- **Features**: AI-simulated density prediction, smart routing, real-time alerts, admin control panel.

## Getting Started

### Backend Setup
1. Navigate to the `backend` folder.
2. Run `npm install`.
3. Start the server with `npm start`.
   - Server runs on `http://localhost:5000`
   - WebSocket runs on the same port.

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Run `npm install`.
3. Start the development server with `npm run dev`.
4. Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

## Key Features
- **AI Crowd Density**: Predicts Low, Medium, or High density based on simulated real-time data.
- **Wait Time Estimation**: Calculates wait times for gates and stalls using service point data.
- **Interactive Map**: Visualize crowd heatmaps using Leaflet.js with dark-mode tiles.
- **PulseAI Chatbot**: A rule-based assistant to help users find less crowded areas.
- **Admin Command Center**: Manually override crowd levels or simulate emergency spikes to see the system's reaction.
- **Emergency Alerts**: Real-time notifications and UI changes when zones exceed safety thresholds.
