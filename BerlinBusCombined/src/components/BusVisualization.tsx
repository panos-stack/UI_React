import { Check } from 'lucide-react';
import { CleaningSelection } from './BusCleaningApp';

interface BusVisualizationProps {
  onSpotSelect: (spot: string) => void;
  selectedSpot: string | null;
  selections: CleaningSelection[];
}

// Interior spots matching the realistic layout
const interiorSpots = [
  { id: 'windshield', name: 'Windshield', x: 90, y: 25, width: 120, height: 15 },
  { id: 'dashboard', name: 'Dashboard & Drivers Seat', x: 90, y: 50, width: 120, height: 30 },
  { id: 'front-mirror-left', name: 'Front Mirror Left', x: 45, y: 35, width: 25, height: 30 },
  { id: 'front-mirror-right', name: 'Front Mirror Right', x: 230, y: 35, width: 25, height: 30 },
  
  { id: 'steps', name: 'Steps', x: 180, y: 95, width: 45, height: 25 },

  { id: 'seats-row1-left', name: 'Row 1 Left', x: 85, y: 100, width: 35, height: 25 },
  
  { id: 'seats-row2-left', name: 'Row 2 Left', x: 85, y: 130, width: 35, height: 25 },
  { id: 'seats-row2-right', name: 'Row 2 Right', x: 180, y: 130, width: 35, height: 25 },
  
  { id: 'seats-row3-left', name: 'Row 3 Left', x: 85, y: 160, width: 35, height: 25 },
  { id: 'seats-row3-right', name: 'Row 3 Right', x: 180, y: 160, width: 35, height: 25 },
  
  { id: 'seats-row4-left', name: 'Row 4 Left', x: 85, y: 190, width: 35, height: 25 },
  { id: 'seats-row4-right', name: 'Row 4 Right', x: 180, y: 190, width: 35, height: 25 },
  
  { id: 'seats-row5-left', name: 'Row 5 Left', x: 85, y: 220, width: 35, height: 25 },
  { id: 'seats-row5-right', name: 'Row 5 Right', x: 180, y: 220, width: 35, height: 25 },
  
  { id: 'seats-row6-left', name: 'Row 6 Left', x: 85, y: 250, width: 35, height: 25 },
  { id: 'seats-row6-right', name: 'Row 6 Right', x: 180, y: 250, width: 35, height: 25 },
  
  { id: 'seats-row7-left', name: 'Row 7 Left', x: 85, y: 280, width: 35, height: 25 },
  { id: 'seats-row7-right', name: 'Row 7 Right', x: 180, y: 280, width: 35, height: 25 },
  
  { id: 'seats-row8-left', name: 'Row 8 Left', x: 85, y: 310, width: 35, height: 25 },
  { id: 'seats-row8-right', name: 'Row 8 Right', x: 180, y: 310, width: 35, height: 25 },
  
  { id: 'seats-row9-left', name: 'Row 9 Left', x: 85, y: 340, width: 35, height: 25 },
  { id: 'seats-row9-right', name: 'Row 9 Right', x: 180, y: 340, width: 35, height: 25 },
  
  { id: 'seats-row10-left', name: 'Row 10 Left', x: 85, y: 370, width: 40, height: 25 },
  { id: 'seats-row10-middle', name: 'Row 10 Middle', x: 130, y: 370, width: 40, height: 25 },
  { id: 'seats-row10-right', name: 'Row 10 Right', x: 175, y: 370, width: 40, height: 25 },
  
  { id: 'aisle', name: 'Aisle', x: 125, y: 100, width: 50, height: 265 },
  { id: 'windows-left', name: 'Windows (Left)', x: 60, y: 100, width: 20, height: 265 },
  { id: 'windows-right', name: 'Windows (Right)', x: 220, y: 130, width: 20, height: 240 },
];

export function BusVisualization({ onSpotSelect, selectedSpot, selections }: BusVisualizationProps) {
  const isSpotSelected = (spotId: string) => {
    return selections.some(s => s.spot === spotId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-slate-800 mb-3">Bus Interior (Top View) - Click to Select Areas</h2>
      
      <div className="relative w-full max-w-md mx-auto" style={{ paddingBottom: '140%' }}>
        <svg 
          viewBox="0 0 300 420" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Bus outline - rounded front */}
          <defs>
            <linearGradient id="busBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main bus body */}
          <path
            d="M 70 85 L 70 400 L 230 400 L 230 85 L 220 85 L 220 30 Q 220 15 205 15 L 95 15 Q 80 15 80 30 L 80 85 Z"
            fill="url(#busBody)"
            stroke="#64748b"
            strokeWidth="3"
          />
          
          {/* Driver cab area */}
          <path
            d="M 80 30 Q 80 15 95 15 L 205 15 Q 220 15 220 30 L 220 85 L 80 85 Z"
            fill="#eab308"
            stroke="#64748b"
            strokeWidth="2"
          />
          
          {/* Windshield */}
          <ellipse cx="150" cy="30" rx="55" ry="10" fill="#7dd3fc" stroke="#64748b" strokeWidth="2"/>
          
          {/* Side mirrors */}
          <ellipse cx="55" cy="50" rx="8" ry="12" fill="#1f2937" stroke="#64748b" strokeWidth="1.5"/>
          <rect x="55" y="44" width="15" height="3" fill="#1f2937" stroke="#64748b" strokeWidth="1"/>
          
          <ellipse cx="245" cy="50" rx="8" ry="12" fill="#1f2937" stroke="#64748b" strokeWidth="1.5"/>
          <rect x="230" y="44" width="15" height="3" fill="#1f2937" stroke="#64748b" strokeWidth="1"/>
          
          {/* Dashboard/steering wheel area */}
          <rect x="95" y="50" width="110" height="30" fill="#4b5563" stroke="#64748b" strokeWidth="1.5" rx="3"/>
          <circle cx="150" cy="65" r="10" fill="#6b7280" stroke="#64748b" strokeWidth="1"/>

          {/* Steps */}          
          <rect x="180" y="95" width="45" height="25" fill="url(#busBody)" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="100" width="8" height="15" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="195" y="100" width="8" height="15" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="205" y="100" width="8" height="15" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="215" y="100" width="8" height="15" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Regular seats - beige/tan color - Row 1 */}
          <rect x="85" y="100" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="105" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>

          {/* Row 2 */}
          <rect x="85" y="130" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="135" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="130" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="135" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 3 */}
          <rect x="85" y="160" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="165" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="160" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="165" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 4 */}
          <rect x="85" y="190" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="195" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="190" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="195" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 5 */}
          <rect x="85" y="220" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="225" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="220" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="225" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 6 */}
          <rect x="85" y="250" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="255" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="250" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="255" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 7 */}
          <rect x="85" y="280" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="285" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="280" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="285" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 8 */}
          <rect x="85" y="310" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="315" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="310" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="315" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Row 9 */}
          <rect x="85" y="340" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="345" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="180" y="340" width="35" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="185" y="345" width="25" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>

          {/* Row 10 */}
          <rect x="85" y="370" width="40" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="90" y="375" width="30" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>

          <rect x="130" y="370" width="40" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="135" y="375" width="30" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="175" y="370" width="40" height="25" fill="#d4a574" stroke="#64748b" strokeWidth="2" rx="3"/>
          <rect x="180" y="375" width="30" height="8" fill="#b8860b" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          {/* Aisle - light gray */}
          <rect x="125" y="100" width="50" height="265" fill="#f1f5f9" stroke="none"/>
          
          {/* Windows on sides */}
          <rect x="72" y="100" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="130" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="160" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="190" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="220" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="250" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="280" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="310" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="72" y="340" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          
          <rect x="220" y="130" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="160" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="190" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="220" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="250" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="280" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="310" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>
          <rect x="220" y="340" width="8" height="25" fill="#7dd3fc" stroke="#64748b" strokeWidth="1" rx="2"/>

          {/* Interactive spots */}
          {interiorSpots.map(spot => {
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
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {interiorSpots.map(spot => {
          const isSelected = isSpotSelected(spot.id);
          const isActive = selectedSpot === spot.id;
          
          return (
            <button
              key={spot.id}
              onClick={() => onSpotSelect(spot.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : isSelected
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{spot.name}</span>
                {isSelected && <Check className="w-4 h-4 text-green-600" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}