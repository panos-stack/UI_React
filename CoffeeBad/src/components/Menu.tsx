import { ViewMode } from '../App';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  description: string;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Espresso', price: 3.50, emoji: '☕', description: 'Strong & bold' },
  { id: '2', name: 'Cappuccino', price: 4.50, emoji: '🥤', description: 'Frothy delight' },
  { id: '3', name: 'Latte', price: 4.00, emoji: '🍵', description: 'Smooth & creamy' },
  { id: '4', name: 'Cold Brew', price: 4.75, emoji: '🧊', description: 'Refreshingly cold' },
  { id: '5', name: 'Croissant', price: 3.25, emoji: '🥐', description: 'Buttery & flaky' },
  { id: '6', name: 'Muffin', price: 2.75, emoji: '🧁', description: 'Sweet & soft' },
  { id: '7', name: 'Chips', price: 2.00, emoji: '🥔', description: 'Crunchy snack' },
  { id: '8', name: 'Candy Bar', price: 1.50, emoji: '🍫', description: 'Sweet treat' },
  { id: '9', name: 'Cookie', price: 2.25, emoji: '🍪', description: 'Freshly baked' },
  { id: '10', name: 'Energy Drink', price: 3.00, emoji: '⚡', description: 'Get energized' },
];

interface MenuProps {
  onAddToCart: (item: { id: string; name: string; price: number; emoji: string }) => void;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
}

export function Menu({ onAddToCart, onNavigate, cartCount }: MenuProps) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 min-h-[600px]">
      {/* Unconventional header - rotated text */}
      <div className="flex items-start justify-between mb-8">
        <div className="transform -rotate-2">
          <h1 className="text-white bg-black px-4 py-2 inline-block -skew-x-6">
            BUS STOP BITES
          </h1>
          <p className="mt-2 text-gray-600 italic transform rotate-1">
            tap items below (maybe twice?)
          </p>
        </div>
        
        {/* Cart button in unusual location and style */}
        {cartCount > 0 && (
          <button
            onClick={() => onNavigate('cart')}
            className="relative bg-yellow-300 hover:bg-yellow-400 rounded-full p-3 transform rotate-12 hover:rotate-0 transition-transform"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transform -rotate-12">
              {cartCount}
            </span>
          </button>
        )}
      </div>

      {/* Unconventional grid layout - items in unusual arrangement */}
      <div className="space-y-3">
        {menuItems.map((item, index) => {
          // Random-looking rotation and positioning
          const rotations = [-2, 1, -1, 2, 0, -1, 1, -2, 2, -1];
          const rotation = rotations[index % rotations.length];
          
          return (
            <button
              key={item.id}
              onClick={() => onAddToCart(item)}
              className={`w-full text-left bg-gradient-to-r from-blue-100 to-green-100 hover:from-blue-200 hover:to-green-200 p-4 rounded-2xl transform transition-all hover:scale-105 shadow-md`}
              style={{ transform: `rotate(${rotation}deg)` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="bg-black text-white px-3 py-1 rounded-full inline-block transform -rotate-6">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hidden proceed button that appears when cart has items */}
      {cartCount > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('cart')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 hover:gap-4 transition-all transform hover:scale-110 shadow-lg"
          >
            <span>Continue Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
