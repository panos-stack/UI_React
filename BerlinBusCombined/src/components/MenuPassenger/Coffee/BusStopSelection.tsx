import { BusStop } from './types';
import { MapPin, Clock, Navigation } from 'lucide-react';

interface BusStopSelectionProps {
  busStops: BusStop[];
  selectedStop: BusStop | null;
  onSelectStop: (stop: BusStop) => void;
  onContinue: () => void;
  onBackToMenu: () => void;
  onBackToShops: () => void;
}

export function BusStopSelection({
  busStops,
  selectedStop,
  onSelectStop,
  onContinue,
  onBackToMenu,
  onBackToShops,
}: BusStopSelectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Select Delivery Bus Stop</h2>
        <p className="text-gray-600">Choose where you'd like your order delivered</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Bus Stop List */}
        <div className="space-y-4">
          {busStops.map((stop) => (
            <button
              key={stop.id}
              onClick={() => onSelectStop(stop)}
              className={`w-full bg-white rounded-xl border-2 p-6 text-left transition-all hover:shadow-md ${
                selectedStop?.id === stop.id
                  ? 'border-amber-600 bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedStop?.id === stop.id ? 'bg-amber-600' : 'bg-gray-100'
                  }`}>
                    <MapPin className={`w-5 h-5 ${
                      selectedStop?.id === stop.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{stop.name}</h3>
                    <p className="text-gray-600 mb-2">{stop.route}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{stop.estimatedArrival}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        <span>{stop.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden sticky top-24 h-fit">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-[500px] relative flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map View</p>
              {selectedStop && (
                <div className="mt-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <p className="text-gray-900">{selectedStop.name}</p>
                  <p className="text-gray-600">{selectedStop.route}</p>
                </div>
              )}
            </div>

            {/* Route visualization */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Mock route line */}
              {selectedStop && (
                <>
                  <path
                    d="M 100 100 Q 200 150, 300 100 T 500 150"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="10,5"
                  />
                  <circle cx="300" cy="100" r="8" fill="#f59e0b" />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex gap-3">
          <button
            onClick={onBackToShops}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Shop Selection
          </button>
          <button
            onClick={onBackToMenu}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Coffee Selection
          </button>
        </div>
        {selectedStop && (
          <button
            onClick={onContinue}
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Continue to Checkout
          </button>
        )}
      </div>
    </div>
  );
}