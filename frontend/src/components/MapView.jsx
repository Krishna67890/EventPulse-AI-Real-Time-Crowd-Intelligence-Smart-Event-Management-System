import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Polyline, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAIStatus } from '../utils/aiLogic';
import { Compass, Navigation, Map as MapIcon, Layers, Plus, Minus, Target, Activity, Store, Utensils, Droplets, LogOut, HeartPulse, Wifi, BatteryCharging, ShieldCheck } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import gsap from 'gsap';

// Specialized Icons for different zone types
const getZoneIcon = (id, color) => {
    let Icon = Activity;
    if (id.includes('gate') || id.includes('entry')) Icon = LogOut;
    if (id.includes('food') || id.includes('merch')) Icon = Utensils;
    if (id.includes('washroom')) Icon = Droplets;
    if (id.includes('medical')) Icon = HeartPulse;
    if (id.includes('wifi')) Icon = Wifi;
    if (id.includes('power') || id.includes('charging')) Icon = BatteryCharging;
    if (id.includes('security')) Icon = ShieldCheck;
    if (id.includes('vip')) Icon = Store;

    return L.divIcon({
        html: renderToStaticMarkup(
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
                <div className="p-2 rounded-lg border border-white/20 shadow-lg backdrop-blur-md" style={{ backgroundColor: `${color}33`, color: color }}>
                    <Icon size={14} strokeWidth={3} />
                </div>
            </div>
        ),
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
};

// Helper component to handle map programmatic changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom(), { animate: true });
    }
  }, [center, zoom, map]);
  return null;
};

const MapView = ({ zones = [], isEmergency }) => {
  const [route, setRoute] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isSatellite, setIsSatellite] = useState(false);
  const [showFlowVectors, setShowFlowVectors] = useState(true);
  const [predictionTime, setPredictionTime] = useState(0);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [mapCenter, setMapCenter] = useState([51.508, -0.085]);
  const [mapZoom, setMapZoom] = useState(15);
  const mapContainerRef = useRef(null);

  const handleZoneClick = (zone) => {
    setMapCenter([zone.lat, zone.lng]);
    setMapZoom(17);

    // Create detailed analysis payload
    const trend = (zone.ai && zone.ai.trend === 'Increasing') ? "UPWARD_SURGE" : "STABLE_FLOW";
    const riskLevel = (zone.people / zone.capacity) > 0.8 ? "CRITICAL" : "OPTIMAL";

    const analysisPayload = `[NEURAL LINK: ${zone.name}]
ANALYSIS: Sector ${zone.id} currently exhibiting ${trend} patterns. Density: ${Math.round((zone.people/zone.capacity)*100)}%.
THREAT LEVEL: ${riskLevel}.
RECOMMENDATION: ${riskLevel === "CRITICAL" ? "Initiate immediate PAX diversion to auxiliary exits." : "Maintain current throughput monitoring."}`;

    // Dispatch event to Chatbot
    const event = new CustomEvent('pulse-map-analysis', {
        detail: {
            message: analysisPayload,
            raw: zone
        }
    });
    window.dispatchEvent(event);

    // Visual HUD Feedback
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[5000] px-6 py-3 bg-neonBlue text-black font-black rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.5)] text-[10px] uppercase tracking-widest border border-white/20';
    toast.innerHTML = `<div class="flex items-center gap-2"><div class="w-2 h-2 bg-black rounded-full animate-pulse"></div> TELEMETRY SYNC: ${zone.name}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  useEffect(() => {
    if (isEmergency && zones && zones.length > 0) {
        // Auto-calculate evacuation route when emergency hits
        const gateB = zones.find(z => z.id === 'gate_b' || z.name?.toLowerCase().includes('gate b'));
        const mainStage = zones.find(z => z.id === 'main_stage' || z.name?.toLowerCase().includes('stage'));
        if (gateB && mainStage && gateB.lat && mainStage.lat) {
            setRoute([
                [mainStage.lat, mainStage.lng],
                [gateB.lat, gateB.lng]
            ]);
        }
    } else {
        setRoute(null);
    }
  }, [isEmergency, zones]);

  useEffect(() => {
    gsap.from(mapContainerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out"
    });
  }, []);

  const getFlowArrows = () => {
    const arrows = [];
    if (!zones || zones.length < 2) return arrows;

    // Create logical flow between adjacent zones or from high to low density
    for (let i = 0; i < zones.length - 1; i++) {
        const from = zones[i];
        const to = zones[i+1];
        if (from.lat && to.lat) {
            arrows.push({
                from: [from.lat, from.lng],
                to: [to.lat, to.lng],
                intensity: from.people / from.capacity
            });
        }
    }
    return arrows;
  };

  const findBestRoute = () => {
    // Logic: Connect the two least crowded zones to simulate "Safe Path"
    const sorted = [...zones].sort((a, b) => (a.people / a.capacity) - (b.people / b.capacity));
    if (sorted.length >= 2) {
      setRoute([
        [sorted[0].lat, sorted[0].lng],
        [sorted[1].lat, sorted[1].lng]
      ]);

      // Notification simulation
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[5000] px-6 py-3 bg-neonBlue text-black font-bold rounded-full shadow-lg animate-bounce text-xs uppercase tracking-widest';
      toast.innerText = `Route Optimized: ${sorted[0].name} to ${sorted[1].name} (30% Faster)`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  return (
    <div ref={mapContainerRef} className="relative w-full h-[600px] rounded-[2rem] overflow-hidden glassmorphism border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Cinematic HUD Scanline */}
      <div className="absolute inset-0 pointer-events-none z-[2000] bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-scanline opacity-20" />

      {/* Advanced Global Telemetry Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2 pointer-events-none">
          <div className="glassmorphism p-3 border border-white/10 flex items-center gap-4">
              <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Global PAX</span>
                  <span className="text-sm font-black text-neonBlue font-mono">{zones.reduce((acc, z) => acc + z.people, 0)}</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Risk Index</span>
                  <span className="text-sm font-black text-red-500 font-mono">
                      {Math.max(...zones.map(z => (z.people/z.capacity)*100)).toFixed(1)}%
                  </span>
              </div>
          </div>
      </div>

      {/* Map Overlay Controls */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-3">
        <div className="p-2 glassmorphism border border-white/10 flex flex-col gap-2">
            <ControlBtn icon={<Plus size={18} />} onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))} tooltip="Zoom In" />
            <ControlBtn icon={<Minus size={18} />} onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))} tooltip="Zoom Out" />
            <div className="h-[1px] bg-white/10 mx-2" />
            <ControlBtn icon={<Navigation size={18} />} active onClick={findBestRoute} tooltip="Optimize Route" />
            <ControlBtn icon={<Layers size={18} />} active={showHeatmap} onClick={() => setShowHeatmap(!showHeatmap)} tooltip="Toggle Heatmap" />
            <ControlBtn icon={<Compass size={18} />} active={showFlowVectors} onClick={() => setShowFlowVectors(!showFlowVectors)} tooltip="Toggle Flow Vectors" />
            <ControlBtn icon={<MapIcon size={18} />} active={isSatellite} onClick={() => setIsSatellite(!isSatellite)} tooltip="Toggle Satellite Link" />
            <ControlBtn icon={<Target size={18} />} onClick={() => { setMapCenter([51.508, -0.085]); setMapZoom(15); }} tooltip="Recenter Global View" />
        </div>
      </div>

      <div className="absolute top-6 right-6 z-[1000] space-y-4">
        <div className="glassmorphism p-5 border border-white/10">
            <h4 className="text-[10px] font-black text-white/40 mb-3 tracking-[0.2em] uppercase">Density Legend</h4>
            <div className="space-y-2">
                <LegendItem color="bg-emerald-500" label="Safe (0-30%)" />
                <LegendItem color="bg-amber-500" label="Moderate (30-60%)" />
                <LegendItem color="bg-orange-500" label="High (60-80%)" />
                <LegendItem color="bg-red-500" label="Critical (80%+)" />
                <LegendItem color="bg-purple-500" label="Guardian Risk" />
            </div>
        </div>

        {route && (
            <div className="glassmorphism p-4 border border-neonBlue/30 bg-neonBlue/5 animate-pulse">
                <div className="flex items-center gap-2 text-neonBlue">
                    <Compass size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Suggestion</span>
                </div>
                <p className="text-[9px] text-white/60 mt-1">Use West Corridor for 12m bypass.</p>
            </div>
        )}
      </div>

      {/* Prediction Slider Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-2/3 max-w-md">
        <div className="glassmorphism p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Current State</span>
                <span className="text-neonBlue">T + {predictionTime} MIN (PREDICTED)</span>
            </div>
            <input
                type="range" min="0" max="10" value={predictionTime}
                onChange={(e) => setPredictionTime(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neonBlue"
            />
        </div>
      </div>

      {/* Simulation Toggle */}
      <div className="absolute top-6 left-24 z-[1000]">
          <button
            onClick={() => setIsSimulationMode(!isSimulationMode)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${isSimulationMode ? 'bg-amber-500 border-amber-400 text-black' : 'glassmorphism border-white/10 text-white/40'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isSimulationMode ? 'bg-black animate-pulse' : 'bg-white/20'}`} />
            {isSimulationMode ? '5G OUTAGE SIMULATION' : 'SIMULATE NETWORK LOSS'}
          </button>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={false}
        className="map-container-layer"
        style={{
            height: '100%',
            width: '100%',
            background: '#050505',
            filter: 'contrast(1.2) brightness(0.8) saturate(1.4)'
        }}
        scrollWheelZoom={true}
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url={isSimulationMode
            ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            : isSatellite
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          }
          attribution={isSatellite
            ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
            : '&copy; OpenStreetMap &copy; CARTO'
          }
          opacity={isSatellite ? 0.9 : 1.0}
        />

        {showHeatmap && (zones || []).map(zone => {
          if (!zone.lat || !zone.lng) return null;
          // Prediction Logic: Simple growth based on trend
          const trendMultiplier = (zone.ai && zone.ai.trend === 'Increasing') ? 1.05 : 0.95;
          const predictedPeople = zone.people * Math.pow(trendMultiplier, predictionTime);

          const ai = getAIStatus(predictedPeople, zone.capacity);
          const isAtRisk = (predictedPeople / zone.capacity) > 0.85;
          const finalColor = isEmergency ? '#ff0000' : isAtRisk ? '#a855f7' : ai.color;
          const pulseClass = isAtRisk ? 'pulse-purple' : '';

          return (
            <React.Fragment key={zone.id}>
                {/* Current Heatmap (Glow Effect) */}
                <Circle
                    center={[zone.lat, zone.lng]}
                    radius={zone.people * 0.2 + 80}
                    eventHandlers={{
                      click: () => handleZoneClick(zone)
                    }}
                    pathOptions={{
                        fillColor: isEmergency ? '#ff0000' : ai.color,
                        color: isEmergency ? '#ff0000' : ai.color,
                        weight: 2,
                        opacity: predictionTime > 0 ? 0.05 : 0.8,
                        fillOpacity: predictionTime > 0 ? 0.02 : 0.4,
                        className: 'heatmap-pulse-anim cursor-pointer'
                    }}
                />

                {/* Specialized Marker for Identification */}
                <Marker
                    position={[zone.lat, zone.lng]}
                    icon={getZoneIcon(zone.id, isEmergency ? '#ff0000' : ai.color)}
                    eventHandlers={{
                        click: () => handleZoneClick(zone)
                    }}
                />

                {/* Prediction "Ghost" Heatmap */}
                {predictionTime > 0 && (
                    <Circle
                        center={[zone.lat, zone.lng]}
                        radius={predictedPeople * 0.15 + 100}
                        pathOptions={{
                            fillColor: finalColor,
                            color: finalColor,
                            weight: isAtRisk ? 3 : 1,
                            opacity: 0.8,
                            fillOpacity: isAtRisk ? 0.5 : 0.35,
                            className: `${pulseClass} ghost-node-anim`,
                            dashArray: '5, 5'
                        }}
                    >
                        <Popup>
                            <div className="text-[10px] font-bold">PREDICTED DENSITY: {Math.round(predictedPeople)}</div>
                        </Popup>
                    </Circle>
                )}

                {/* Information Popup for the Zone (When not predicting) */}
                {predictionTime === 0 && (
                  <Circle
                    center={[zone.lat, zone.lng]}
                    radius={20}
                    pathOptions={{ opacity: 0, fillOpacity: 0 }}
                  >
                    <Popup>
                      <div className="bg-dark text-white p-3 rounded-xl border border-white/10 min-w-[150px]">
                        <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">{zone.id}</p>
                        <h3 className="font-bold text-lg mb-2 text-white">{zone.name}</h3>
                        <div className="justify-between text-xs mb-3 flex">
                          <span className="text-white/60">Current Crowd:</span>
                          <span className="font-bold text-neonBlue">{zone.people}</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-center text-[10px] mb-1">
                              <span className="text-white/40 font-bold">AI STATUS</span>
                              <span className="font-black" style={{ color: ai.color }}>{ai.level}</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full" style={{ width: `${(zone.people/zone.capacity)*100}%`, backgroundColor: ai.color }} />
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                )}
            </React.Fragment>
          );
        })}

        {/* Vector Flow Arrows */}
        {showFlowVectors && !isSimulationMode && getFlowArrows().map((arrow, idx) => (
            <Polyline
                key={`flow-${idx}`}
                positions={[arrow.from, arrow.to]}
                pathOptions={{
                    color: isEmergency ? '#ff4d4d' : '#00f3ff',
                    weight: 2,
                    opacity: arrow.intensity * 0.8,
                    dashArray: '10, 10',
                    className: 'flow-arrow-anim'
                }}
            />
        ))}

        {route && (
          <Polyline
            positions={route}
            pathOptions={{
                color: isEmergency ? '#22c55e' : '#00f3ff',
                weight: 6,
                opacity: 0.8,
                lineCap: 'round',
                className: isEmergency ? 'safe-path-anim' : 'path-glow-anim'
            }}
          >
            <Popup>
                <div className="p-2">
                    <p className={`text-[10px] font-black uppercase ${isEmergency ? 'text-emerald-400' : 'text-neonBlue'}`}>
                        {isEmergency ? 'GUARDIAN EVACUATION ROUTE' : 'Safe Corridor'}
                    </p>
                    <p className="text-[9px] text-white/60">Avoiding high-density nodes</p>
                </div>
            </Popup>
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
};

const ControlBtn = ({ icon, active, onClick, tooltip }) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-xl transition-all relative group/btn ${active ? 'bg-neonBlue text-black shadow-neon-blue' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
    >
        {icon}
        <span className="absolute left-full ml-3 px-2 py-1 bg-black text-[10px] text-white font-bold rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
            {tooltip}
        </span>
    </button>
);

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[9px] font-bold text-white/60 tracking-wider uppercase">{label}</span>
    </div>
);

export default MapView;
