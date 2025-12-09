import { CartItem } from './CoffeeOrderingApp';
import { CheckCircle, MapPin, Clock, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderConfirmationProps {
  orderNumber: string;
  busStop: string;
  cart: CartItem[];
  onReset: () => void;
}

export function OrderConfirmation({ orderNumber, busStop, cart, onReset }: OrderConfirmationProps) {
  const [rotation, setRotation] = useState(0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Unconventional: rotating confirmation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 min-h-[600px] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              transform: `rotate(${rotation + i * 30}deg)`,
              animation: `spin ${3 + i}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Unconventional success indicator - spinning checkmark */}
        <div className="text-center mb-8">
          <div 
            className="inline-block bg-gradient-to-r from-green-400 to-blue-400 rounded-full p-6 shadow-xl"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="mt-6 transform -skew-x-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 inline-block rounded-2xl shadow-lg">
            ORDER IN MOTION!
          </h1>
        </div>

        {/* Order number in unusual format */}
        <div className="bg-yellow-200 rounded-2xl p-4 mb-6 transform rotate-2 shadow-md">
          <p className="text-center text-gray-700 text-sm mb-1">Your Magic Number</p>
          <p className="text-center text-3xl tracking-widest transform -rotate-2">
            {orderNumber.split('').map((char, i) => (
              <span 
                key={i} 
                className="inline-block mx-1 bg-black text-white px-2 py-1 rounded transform hover:scale-125 transition-transform"
                style={{ transform: `rotate(${(i % 2 === 0 ? -5 : 5)}deg)` }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Delivery info in unconventional layout */}
        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 transform -rotate-1 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <MapPin className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Meeting Point</p>
                <p className="text-gray-800">{busStop}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 transform rotate-1 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Arrival</p>
                <p className="text-gray-800">Next stop! (~5 min)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order summary with horizontal scroll */}
        <div className="mb-6">
          <h3 className="text-gray-700 mb-3 transform -rotate-1 inline-block bg-gray-100 px-3 py-1 rounded">
            Your Treats
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {cart.map((item, i) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl p-3 min-w-[120px] shadow-md transform hover:scale-105 transition-transform"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-center">
                  <span className="text-3xl block mb-1">{item.emoji}</span>
                  <p className="text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-600">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total in unusual spot */}
        <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl p-4 mb-8 transform -rotate-1 shadow-lg">
          <div className="flex justify-between items-center text-white">
            <span>Total Paid</span>
            <span className="text-2xl">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* New order button in unconventional style */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full inline-flex items-center gap-3 hover:gap-5 transition-all transform hover:scale-110 shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Start New Journey</span>
          </button>
          
          <p className="mt-4 text-sm text-gray-600 italic transform rotate-1">
            (Driver will bring your order to the stop)
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
