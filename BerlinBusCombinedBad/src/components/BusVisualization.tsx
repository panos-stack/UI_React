import { Check } from 'lucide-react';
import { CleaningSelection } from './BusCleaningApp';

interface BusVisualizationProps {
  onSpotSelect: (spot: string) => void;
  selectedSpot: string | null;
  selections: CleaningSelection[];
}

// Side view spots
const sideViewSpots = [
  { id: 'front-windshield', name: 'Front Windshield', x: 85, y: 30, width: 60, height: 35 },
  { id: 'driver-window', name: 'Driver Window', x: 130, y: 70, width: 35, height: 25 },
  { id: 'front-door', name: 'Front Door', x: 170, y: 70, width: 30, height: 45 },
  { id: 'passenger-windows', name: 'Passenger Windows', x: 205, y: 70, width: 180, height: 25 },
  { id: 'rear-window', name: 'Rear Window', x: 390, y: 70, width: 30, height: 30 },
  { id: 'roof', name: 'Roof', x: 145, y: 15, width: 245, height: 50 },
  { id: 'body-side', name: 'Side Body', x: 145, y: 100, width: 245, height: 40 },
  { id: 'front-bumper', name: 'Front Bumper', x: 40, y: 65, width: 40, height: 80 },
  { id: 'rear-bumper', name: 'Rear Bumper', x: 425, y: 65, width: 40, height: 80 },
  { id: 'front-wheel', name: 'Front Wheels', x: 110, y: 140, width: 40, height: 40 },
  { id: 'rear-wheel', name: 'Rear Wheels', x: 360, y: 140, width: 40, height: 40 },
  { id: 'undercarriage', name: 'Undercarriage', x: 155, y: 145, width: 200, height: 30 },
];

// Interior top-down view spots
const interiorSpots = [
  { id: 'driver-area', name: 'Driver Area', x: 50, y: 30, width: 80, height: 60 },
  { id: 'front-seats', name: 'Front Seats', x: 150, y: 30, width: 80, height: 50 },
  { id: 'middle-seats-left', name: 'Middle Seats (Left)', x: 150, y: 90, width: 80, height: 90 },
  { id: 'middle-seats-right', name: 'Middle Seats (Right)', x: 270, y: 90, width: 80, height: 90 },
  { id: 'rear-seats', name: 'Rear Seats', x: 210, y: 190, width: 80, height: 50 },
  { id: 'aisle', name: 'Aisle', x: 240, y: 30, width: 20, height: 150 },
  { id: 'dashboard', name: 'Dashboard', x: 50, y: 100, width: 80, height: 40 },
  { id: 'floor', name: 'Floor', x: 150, y: 190, width: 50, height: 50 },
  { id: 'ceiling', name: 'Ceiling', x: 360, y: 30, width: 90, height: 80 },
  { id: 'handrails', name: 'Handrails', x: 360, y: 120, width: 90, height: 60 },
  { id: 'rear-area', name: 'Rear Area', x: 300, y: 190, width: 150, height: 50 },
];

const allSpots = [...sideViewSpots, ...interiorSpots];

const InteractiveSpots = ({ 
  spots, 
  selectedSpot, 
  selections, 
  onSpotSelect 
}: { 
  spots: typeof sideViewSpots;
  selectedSpot: string | null;
  selections: CleaningSelection[];
  onSpotSelect: (spot: string) => void;
}) => {
  const isSpotSelected = (spotId: string) => {
    return selections.some(s => s.spot === spotId);
  };

  return (
    <>
      {spots.map(spot => {
        const isSelected = isSpotSelected(spot.id);
        const isActive = selectedSpot === spot.id;
        
        return (
          <g key={spot.id}>
            <rect
              x={spot.x}
              y={spot.y}
              width={spot.width}
              height={spot.height}
              fill={isActive ? '#3b82f6' : isSelected ? '#10b981' : 'transparent'}
              opacity={isActive ? 0.4 : isSelected ? 0.3 : 0}
              stroke={isActive ? '#3b82f6' : isSelected ? '#10b981' : '#64748b'}
              strokeWidth={isActive ? 3 : isSelected ? 2 : 0}
              strokeDasharray={isActive ? '5,3' : '0'}
              className="cursor-pointer transition-all duration-200"
              onClick={() => onSpotSelect(spot.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.stroke = '#3b82f6';
                e.currentTarget.style.strokeWidth = '2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = isActive ? '0.4' : isSelected ? '0.3' : '0';
                e.currentTarget.style.stroke = isActive ? '#3b82f6' : isSelected ? '#10b981' : '#64748b';
                e.currentTarget.style.strokeWidth = isActive ? '3' : isSelected ? '2' : '0';
              }}
              rx="4"
            />
            {isSelected && (
              <g transform={`translate(${spot.x + spot.width - 15}, ${spot.y + 5})`}>
                <circle cx="8" cy="8" r="8" fill="#10b981"/>
                <path
                  d="M 5 8 L 7 10 L 11 6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </g>
        );
      })}
    </>
  );
};

export function BusVisualization({ onSpotSelect, selectedSpot, selections }: BusVisualizationProps) {
  const isSpotSelected = (spotId: string) => {
    return selections.some(s => s.spot === spotId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Side View */}
        <div>
          <div className="relative w-full" style={{ paddingBottom: '90%' }}>
            <svg 
              viewBox="0 0 500 200" 
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
            >
              {/* Bus body base */}
              <path
                d="M 80 65 L 50 85 L 50 135 L 80 145 L 430 145 L 460 135 L 460 85 L 430 65 Z"
                fill="#e2e8f0"
                stroke="#64748b"
                strokeWidth="2"
              />
              
              {/* Bus roof */}
              <path
                d="M 145 15 L 135 65 L 395 65 L 390 15 Z"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="2"
              />
              
              {/* Front windshield */}
              <path
                d="M 85 30 L 80 65 L 145 65 L 145 30 Z"
                fill="#a5d8ff"
                stroke="#64748b"
                strokeWidth="2"
              />
              
              {/* Rear window */}
              <path
                d="M 390 70 L 390 100 L 420 95 L 420 75 Z"
                fill="#a5d8ff"
                stroke="#64748b"
                strokeWidth="2"
              />
              
              {/* Side windows */}
              <rect x="130" y="70" width="35" height="25" fill="#a5d8ff" stroke="#64748b" strokeWidth="2" rx="2"/>
              <rect x="210" y="70" width="35" height="25" fill="#a5d8ff" stroke="#64748b" strokeWidth="2" rx="2"/>
              <rect x="250" y="70" width="35" height="25" fill="#a5d8ff" stroke="#64748b" strokeWidth="2" rx="2"/>
              <rect x="290" y="70" width="35" height="25" fill="#a5d8ff" stroke="#64748b" strokeWidth="2" rx="2"/>
              <rect x="330" y="70" width="35" height="25" fill="#a5d8ff" stroke="#64748b" strokeWidth="2" rx="2"/>
              
              {/* Front door */}
              <rect x="170" y="70" width="30" height="45" fill="#94a3b8" stroke="#64748b" strokeWidth="2" rx="2"/>
              <line x1="170" y1="85" x2="200" y2="85" stroke="#64748b" strokeWidth="1"/>
              
              {/* Wheels */}
              <circle cx="130" cy="160" r="20" fill="#1e293b" stroke="#64748b" strokeWidth="3"/>
              <circle cx="130" cy="160" r="12" fill="#475569" />
              <circle cx="380" cy="160" r="20" fill="#1e293b" stroke="#64748b" strokeWidth="3"/>
              <circle cx="380" cy="160" r="12" fill="#475569" />
              
              {/* Front lights */}
              <circle cx="60" cy="80" r="5" fill="#fef08a" stroke="#64748b" strokeWidth="1"/>
              <circle cx="60" cy="100" r="5" fill="#fef08a" stroke="#64748b" strokeWidth="1"/>
              
              {/* Rear lights */}
              <circle cx="450" cy="80" r="5" fill="#fca5a5" stroke="#64748b" strokeWidth="1"/>
              <circle cx="450" cy="100" r="5" fill="#fca5a5" stroke="#64748b" strokeWidth="1"/>

              <InteractiveSpots 
                spots={sideViewSpots}
                selectedSpot={selectedSpot}
                selections={selections}
                onSpotSelect={onSpotSelect}
              />
            </svg>
          </div>
        </div>

        {/* Interior Top View */}
        <div>
          <div className="relative w-full" style={{ paddingBottom: '90%' }}>
            <svg 
              viewBox="0 0 500 270" 
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
            >
              {/* Bus outline */}
              <rect x="40" y="20" width="420" height="230" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" rx="15"/>
              
              {/* Front of bus indicator */}
              <path d="M 40 20 Q 250 10 460 20" stroke="#64748b" strokeWidth="2" fill="none"/>
              <text x="250" y="15" textAnchor="middle" fill="#64748b" fontSize="12">FRONT</text>
              
              {/* Driver area */}
              <rect x="50" y="30" width="80" height="60" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" rx="5"/>
              <circle cx="90" cy="60" r="15" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
              <text x="90" y="65" textAnchor="middle" fill="#475569" fontSize="10">🚗</text>
              
              {/* Dashboard */}
              <rect x="50" y="100" width="80" height="40" fill="#94a3b8" stroke="#64748b" strokeWidth="2" rx="3"/>
              
              {/* Front seats row */}
              <rect x="150" y="35" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="195" y="35" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              {/* Aisle */}
              <rect x="240" y="30" width="20" height="180" fill="#e0e7ff" stroke="#64748b" strokeWidth="1" strokeDasharray="5,5"/>
              
              {/* Middle seats - left side */}
              <rect x="150" y="90" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="195" y="90" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              <rect x="150" y="140" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="195" y="140" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              {/* Middle seats - right side */}
              <rect x="270" y="90" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="315" y="90" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              <rect x="270" y="140" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="315" y="140" width="35" height="40" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              {/* Rear seats */}
              <rect x="150" y="195" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="195" y="195" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="240" y="195" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              <rect x="285" y="195" width="35" height="45" fill="#60a5fa" stroke="#64748b" strokeWidth="2" rx="4"/>
              
              {/* Floor area indicator */}
              <circle cx="165" cy="210" r="3" fill="#94a3b8"/>
              <circle cx="175" cy="215" r="3" fill="#94a3b8"/>
              <circle cx="215" cy="210" r="3" fill="#94a3b8"/>
              <circle cx="205" cy="215" r="3" fill="#94a3b8"/>
              
              {/* Ceiling/overhead storage */}
              <rect x="360" y="30" width="90" height="80" fill="#ddd6fe" stroke="#64748b" strokeWidth="2" rx="4"/>
              <line x1="370" y1="50" x2="440" y2="50" stroke="#64748b" strokeWidth="1"/>
              <line x1="370" y1="70" x2="440" y2="70" stroke="#64748b" strokeWidth="1"/>
              <line x1="370" y1="90" x2="440" y2="90" stroke="#64748b" strokeWidth="1"/>
              
              {/* Handrails */}
              <rect x="360" y="120" width="90" height="60" fill="#fef3c7" stroke="#64748b" strokeWidth="2" rx="4"/>
              <circle cx="380" cy="140" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              <circle cx="405" cy="140" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              <circle cx="430" cy="140" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              <circle cx="380" cy="160" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              <circle cx="405" cy="160" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              <circle cx="430" cy="160" r="5" fill="#fbbf24" stroke="#64748b" strokeWidth="1"/>
              
              {/* Rear area/standing room */}
              <rect x="300" y="190" width="150" height="50" fill="#fed7aa" stroke="#64748b" strokeWidth="2" rx="5"/>
              <text x="375" y="220" textAnchor="middle" fill="#92400e" fontSize="12">Standing</text>

              <InteractiveSpots 
                spots={interiorSpots}
                selectedSpot={selectedSpot}
                selections={selections}
                onSpotSelect={onSpotSelect}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
