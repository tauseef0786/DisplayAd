import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  onSelectCountry: (country: string) => void;
  correctCountry: string;
}

interface MapLocation {
  id: string;
  country: string;
  x: number;
  y: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ onSelectCountry, correctCountry }) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  
  const locations: MapLocation[] = [
    { id: '1', country: 'ITALY', x: 55, y: 60 },
    { id: '2', country: 'FRANCE', x: 45, y: 50 },
    { id: '3', country: 'SPAIN', x: 30, y: 60 },
    { id: '4', country: 'GERMANY', x: 60, y: 40 },
    { id: '5', country: 'UK', x: 35, y: 35 }
  ];
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img 
        src="/map.png" 
        alt="World Map" 
        className="w-full h-full object-contain"
      />
      
      {locations.map((location) => (
        <button
          key={location.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            hoveredPin === location.id ? 'scale-125' : 'scale-100'
          }`}
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
          onMouseEnter={() => setHoveredPin(location.id)}
          onMouseLeave={() => setHoveredPin(null)}
          onClick={() => onSelectCountry(location.country)}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <MapPin 
              className={`w-8 h-8 ${location.country === correctCountry ? 'text-red-500' : 'text-blue-600'}`} 
              fill={hoveredPin === location.id ? 'rgba(59, 130, 246, 0.5)' : 'transparent'}
            />
            <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded shadow-sm text-blue-900">
              {location.country}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MapComponent;