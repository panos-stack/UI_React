import { CartItem, ViewMode } from './CoffeeOrderingApp';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onNavigate: (view: ViewMode) => void;
}

export function Cart({ cart, onUpdateQuantity, onNavigate }: CartProps) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 min-h-[600px]">
      {/* Unconventional header with back button in unusual spot */}
      <div className="relative mb-8">
        <h1 className="text-center transform -skew-y-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-2xl shadow-lg">
          YOUR MOVING BASKET
        </h1>
        
        {/* Back button at bottom right of header instead of top left */}
        <button
          onClick={() => onNavigate('menu')}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-300 hover:bg-yellow-400 rounded-full p-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg transform rotate-3">Your basket is floating away...</p>
          <button
            onClick={() => onNavigate('menu')}
            className="mt-6 bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2 rounded-full hover:scale-110 transition-transform"
          >
            Catch Some Snacks
          </button>
        </div>
      ) : (
        <>
          {/* Unconventional cart items - horizontal scroll instead of vertical */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-4 italic transform -rotate-1">
              ← Slide to see items →
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {cart.map((item, index) => {
                const bgColors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'];
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                  <div
                    key={item.id}
                    className={`${bgColor} rounded-2xl p-4 min-w-[250px] shadow-md transform hover:rotate-0 transition-transform`}
                    style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h3 className="text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      
                      {/* Delete button in unconventional spot */}
                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transform hover:rotate-90 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Unconventional quantity controls - vertical instead of horizontal */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <div className="bg-white rounded-lg px-3 py-1 text-center">
                          <span>{item.quantity}</span>
                        </div>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="bg-black text-white px-3 py-2 rounded-full transform -rotate-6">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total in unconventional place - middle of screen */}
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-6 mb-8 transform -rotate-1 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Journey Total:</span>
              <span className="text-3xl transform rotate-3 inline-block">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout button at top instead of bottom */}
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('payment')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 rounded-full inline-flex items-center gap-3 hover:gap-5 transition-all transform hover:scale-110 shadow-xl"
            >
              <span>Add Payment</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}