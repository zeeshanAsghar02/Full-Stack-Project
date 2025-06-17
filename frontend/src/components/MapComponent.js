import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Box, Paper, Typography, Rating } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import L from 'leaflet';

// Prominent Google-style red pin icon
const customIcon = new L.DivIcon({
  html: `
    <div class="custom-pin">
      <div class="pin-top">
        <div class="pin-inner"></div>
      </div>
      <div class="pin-bottom"></div>
    </div>
  `,
  className: 'custom-marker',
  iconSize: [40, 56],
  iconAnchor: [20, 56],
  popupAnchor: [0, -48]
});

const position = [33.7138, 73.0247]; // Air University coordinates

const MapComponent = () => (
  <Box sx={{
    width: '100%',
    height: '300px',
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    minWidth: '600px',
    maxHeight: '300px',
  }}>
    {/* Info Card */}
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        width: '250px',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 500, fontSize: '0.9rem', mb: 0.5 }}
      >
        Air University Islamabad
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: '0.8rem', mb: 0.5 }}
      >
        Service Road E-9 / E-8, Islamabad
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Rating value={4.3} precision={0.1} readOnly size="small" />
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          4.3 • 2,033 reviews
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: '#1a73e8',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' },
          gap: 0.5,
        }}
        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`, '_blank')}
      >
        <DirectionsIcon sx={{ fontSize: '1rem' }} />
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          Directions
        </Typography>
      </Box>
    </Paper>

    {/* Map */}
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Air University Islamabad<br />
          Main Campus PAF Complex E-9
        </Popup>
      </Marker>
      <ZoomControl position="topright" />
    </MapContainer>
  </Box>
);

export default MapComponent;
