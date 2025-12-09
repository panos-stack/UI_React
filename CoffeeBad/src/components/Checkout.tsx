import { useState } from 'react';
import { CartItem, ViewMode } from '../App';
import { MapPin, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  onComplete: (busStop: string) => void;
  onNavigate: (view: ViewMode) => void;
}

const busStops = [
  { id: '1', name: 'Central Station', time: '3 min', distance: '0.8 km' },
  { id: '2', name: 'University Avenue', time: '7 min', distance: '2.1 km' },
  { id: '3', name: 'Shopping District', time: '12 min', distance: '3.5 km' },
  { id: '4', name: 'Park Boulevard', time: '15 min', distance: '4.2 km' },
  { id: '5', name: 'Harbor View', time: '20 min', distance: '5.8 km' },
  { id: '6', name: 'Tech Quarter', time: '25 min', distance: '7.1 km' },
];

export function Checkout({ cart, onComplete, onNavigate }: CheckoutProps) {
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [hoveredStop, setHoveredStop] = useState<string>('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleComplete = () => {
    if (selectedStop) {
      const stop = busStops.find(s => s.id === selectedStop);
      if (stop) {
        onComplete(stop.name);
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 min-h-[600px] relative">
      {/* Unconventional header - diagonal */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 transform skew-y-2 -mx-6 px-6 py-6 shadow-lg">
          <h1 className="text-white text-center transform -skew-y-2">
            WHERE SHALL WE MEET?
          </h1>
        </div>
        
        {/* Back button in weird spot - bottom left */}
        <button
          onClick={() => onNavigate('payment')}
          className="absolute -bottom-8 left-0 bg-yellow-300 hover:bg-yellow-400 rounded-full p-2 shadow-lg transform rotate-45 hover:rotate-0 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Unconventional instruction */}
      <p className="text-center text-gray-600 mb-6 italic transform rotate-1">
        Click the stop where your treats await...
      </p>

      {/* Bus stops in unconventional circular/radial layout */}
      <div className="mb-8 space-y-3">
        {busStops.map((stop, index) => {
          const isSelected = selectedStop === stop.id;
          const isHovered = hoveredStop === stop.id;
          
          // Alternating left/right positioning
          const alignClass = index % 2 === 0 ? 'mr-auto ml-4' : 'ml-auto mr-4';
          const rotateClass = index % 2 === 0 ? '-rotate-2' : 'rotate-2';
          
          return (
            <button
              key={stop.id}
              onClick={() => setSelectedStop(stop.id)}
              onMouseEnter={() => setHoveredStop(stop.id)}
              onMouseLeave={() => setHoveredStop('')}
              className={`${alignClass} max-w-xs block transform transition-all ${rotateClass} hover:rotate-0 ${
                isSelected 
                  ? 'bg-gradient-to-r from-green-400 to-blue-400 scale-110 shadow-xl' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100'
              } rounded-2xl p-4 shadow-md`}
            >
              <div className="flex items-start gap-3">
                <MapPin className={`w-6 h-6 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                <div className="flex-1 text-left">
                  <h3 className={isSelected ? 'text-white' : 'text-gray-800'}>
                    {stop.name}
                  </h3>
                  <div className="flex gap-3 text-sm mt-1">
                    <span className={isSelected ? 'text-white/90' : 'text-gray-600'}>
                      {stop.time}
                    </span>
                    <span className={isSelected ? 'text-white/90' : 'text-gray-600'}>
                      •
                    </span>
                    <span className={isSelected ? 'text-white/90' : 'text-gray-600'}>
                      {stop.distance}
                    </span>
                  </div>
                </div>
                
                {/* Unconventional selection indicator */}
                {isSelected && (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-xl">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Total amount in unusual position */}
      <div className="absolute top-20 right-6 bg-yellow-300 rounded-full p-4 shadow-lg transform rotate-12">
        <p className="text-sm text-gray-700">Total</p>
        <p className="text-2xl transform -rotate-12">${total.toFixed(2)}</p>
      </div>

      {/* Confirm button that only appears after selection */}
      {selectedStop && (
        <div className="text-center">
          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-full hover:scale-110 transition-transform shadow-xl transform -rotate-1 hover:rotate-0 animate-pulse hover:animate-none"
          >
            Confirm & Order!
          </button>
        </div>
      )}

      {/* Hidden hint */}
      {!selectedStop && (
        <p className="text-center text-gray-400 text-sm mt-4 italic">
          (Select a stop to continue...)
        </p>
      )}
    </div>
  );
}