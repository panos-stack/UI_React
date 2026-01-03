import { CoffeeShop } from './types';
import { Star, Clock } from 'lucide-react';

interface ShopSelectionProps {
  shops: CoffeeShop[];
  onSelectShop: (shop: CoffeeShop) => void;
}

export function ShopSelection({ shops, onSelectShop }: ShopSelectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Select a Coffee Shop</h2>
        <p className="text-gray-600">Choose from our partner coffee shops for delivery to your bus stop</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => onSelectShop(shop)}
            className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-amber-600 hover:shadow-lg transition-all duration-200 text-left group"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{shop.logo}</span>
                  <div>
                    <h3 className="text-gray-900">{shop.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-gray-700">{shop.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{shop.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
