import { useState } from 'react';
import { Drink, CoffeeShop } from './types';
import { ArrowLeft, Plus } from 'lucide-react';
import { calculatePriceBySize } from './utils/pricing';

interface DrinkMenuProps {
  shop: CoffeeShop;
  drinks: Drink[];
  onBack: () => void;
  onAddToCart: (drink: Drink, size: string, price: number) => void;
}

export function DrinkMenu({ shop, drinks, onBack, onAddToCart }: DrinkMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(drinks.map((d) => d.category)))];
  const filteredDrinks = selectedCategory === 'All' 
    ? drinks 
    : drinks.filter((d) => d.category === selectedCategory);

  const handleAddToCart = () => {
    if (selectedDrink && selectedSize) {
      const price = calculatePriceBySize(selectedDrink.price, selectedSize);
      onAddToCart(selectedDrink, selectedSize, price);
      setSelectedDrink(null);
      setSelectedSize('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{shop.logo}</span>
          <div>
            <h2 className="text-gray-900">{shop.name}</h2>
            <p className="text-gray-600">Select your drink</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Drinks Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {filteredDrinks.map((drink) => (
          <button
            key={drink.id}
            onClick={() => {
              setSelectedDrink(drink);
              setSelectedSize(drink.sizes[0]);
            }}
            className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-amber-600 hover:shadow-lg transition-all text-left"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 mb-1">{drink.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">{drink.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-600">€{drink.price.toFixed(2)}</span>
                <Plus className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Shop Selection
        </button>
      </div>

      {/* Size Selection Modal */}
      {selectedDrink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-gray-900 mb-2">{selectedDrink.name}</h3>
            <p className="text-gray-600 mb-6">{selectedDrink.description}</p>

            <div className="mb-6">
              <label className="text-gray-900 mb-3 block">Select Size</label>
              <div className="grid grid-cols-3 gap-3">
                {selectedDrink.sizes.map((size) => {
                  const sizePrice = calculatePriceBySize(selectedDrink.price, size);
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex flex-col items-center ${
                        selectedSize === size
                          ? 'border-amber-600 bg-amber-50 text-amber-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{size}</span>
                      <span className="text-sm mt-1">€{sizePrice.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedDrink(null);
                  setSelectedSize('');
                }}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Add to Cart - €{calculatePriceBySize(selectedDrink.price, selectedSize).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}